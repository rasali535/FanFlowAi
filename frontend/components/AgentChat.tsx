import React, { useState, useRef, useEffect } from 'react';
import { AppState, ChatMessage, AgentAction } from '../types';
import { sendMessageToAgent } from '../services/ai';
import { Send, Bot, User, Loader2, CheckCircle2, AlertCircle, Brain, Eye, Route, Terminal, Network } from 'lucide-react';

interface AgentChatProps {
  state: AppState;
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
  onAgentAction: (action: AgentAction) => void;
  pendingPrompt?: string;
  clearPendingPrompt?: () => void;
}

export const AgentChat: React.FC<AgentChatProps> = ({ state, messages, onSendMessage, onAgentAction, pendingPrompt, clearPendingPrompt }) => {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend,
      timestamp: new Date(),
    };

    onSendMessage(userMsg);
    if (!overrideInput) setInput('');
    setIsTyping(true);

    try {
      const response = await sendMessageToAgent(userMsg.content, state);
      
      const agentMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'agent',
        content: response.message,
        deliberation: response.deliberation,
        timestamp: new Date(),
        actionTaken: response.action ? response.action.type : undefined,
      };

      onSendMessage(agentMsg);

      if (response.action) {
        try {
          const payload = typeof response.action.payload === 'string' 
            ? JSON.parse(response.action.payload) 
            : response.action.payload;
            
          onAgentAction({
            type: response.action.type,
            payload: payload
          });
        } catch (e) {
          console.error("Failed to parse agent action payload", e);
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      onSendMessage({
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: 'Error communicating with the agent swarm. Please check your API key or connection.',
        timestamp: new Date(),
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Handle pending prompt from navigation
  useEffect(() => {
    if (pendingPrompt) {
      handleSend(pendingPrompt);
      if (clearPendingPrompt) clearPendingPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPrompt]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white z-10">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-100 p-2 rounded-full">
            <Network className="text-brand-600" size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">FanFlow Local Swarm</h2>
            <p className="text-xs text-green-600 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              4 Agents Online (Thinker, Analyst, Optimizer, Executor)
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <Network size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-700">Hello! We are the FanFlow Local Swarm.</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              We are a team of 4 specialized AI agents. When you ask a question, we will <b>Think</b>, <b>Analyze</b>, <b>Optimize</b>, and <b>Execute</b> to give you the absolute best result.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
              <button onClick={() => handleSend("Find a highly rated BBQ restaurant near the stadium.")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">Find Local Food</button>
              <button onClick={() => handleSend("Navigate me to the Official FIFA Store in the mall.")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">Mall Navigation</button>
              <button onClick={() => handleSend("Forecast mall foot traffic for the day of the final match.")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">Forecast Traffic</button>
              <button onClick={() => handleSend("Create an Instagram campaign targeting visiting fans.")} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50">Create Campaign</button>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            
            {/* User Message */}
            {msg.role === 'user' && (
              <div className="flex max-w-[85%] flex-row-reverse">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gray-200 ml-3">
                  <User size={16} className="text-gray-600" />
                </div>
                <div className="flex flex-col items-end">
                  <div className="p-4 rounded-2xl shadow-sm bg-brand-600 text-white rounded-tr-none">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            )}

            {/* System Error Message */}
            {msg.role === 'system' && (
              <div className="flex max-w-[85%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-red-100 mr-3">
                  <AlertCircle size={16} className="text-red-600" />
                </div>
                <div className="p-4 rounded-2xl shadow-sm bg-red-50 text-red-800 border border-red-100 rounded-tl-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            )}

            {/* Agent Swarm Response */}
            {msg.role === 'agent' && (
              <div className="flex flex-col w-full max-w-3xl space-y-4">
                
                {/* 1. Thinker Agent */}
                {msg.deliberation?.thinker && (
                  <div className="flex items-start ml-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center mr-3 mt-1 shadow-sm">
                      <Brain size={14} className="text-blue-600" />
                    </div>
                    <div className="bg-white border border-blue-100 p-3 rounded-xl shadow-sm flex-1 relative before:absolute before:top-4 before:-left-2 before:w-2 before:h-2 before:bg-white before:border-l before:border-b before:border-blue-100 before:rotate-45">
                      <p className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">1. Thinker Agent</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{msg.deliberation.thinker}</p>
                    </div>
                  </div>
                )}

                {/* 2. Analyst Agent */}
                {msg.deliberation?.analyst && (
                  <div className="flex items-start ml-12">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-yellow-100 border border-yellow-200 flex items-center justify-center mr-3 mt-1 shadow-sm">
                      <Eye size={14} className="text-yellow-600" />
                    </div>
                    <div className="bg-white border border-yellow-100 p-3 rounded-xl shadow-sm flex-1 relative before:absolute before:top-4 before:-left-2 before:w-2 before:h-2 before:bg-white before:border-l before:border-b before:border-yellow-100 before:rotate-45">
                      <p className="text-xs font-bold text-yellow-600 mb-1 uppercase tracking-wider">2. Analyst Agent</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{msg.deliberation.analyst}</p>
                    </div>
                  </div>
                )}

                {/* 3. Optimizer Agent */}
                {msg.deliberation?.optimizer && (
                  <div className="flex items-start ml-20">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center mr-3 mt-1 shadow-sm">
                      <Route size={14} className="text-purple-600" />
                    </div>
                    <div className="bg-white border border-purple-100 p-3 rounded-xl shadow-sm flex-1 relative before:absolute before:top-4 before:-left-2 before:w-2 before:h-2 before:bg-white before:border-l before:border-b before:border-purple-100 before:rotate-45">
                      <p className="text-xs font-bold text-purple-600 mb-1 uppercase tracking-wider">3. Optimizer Agent</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{msg.deliberation.optimizer}</p>
                    </div>
                  </div>
                )}

                {/* 4. Executor Agent (Final Output) */}
                <div className="flex items-start ml-4 mt-6">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center mr-3 shadow-md">
                    <Terminal size={18} className="text-green-600" />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="bg-green-50 border border-green-200 p-4 rounded-2xl shadow-sm rounded-tl-none">
                      <p className="text-xs font-bold text-green-700 mb-2 uppercase tracking-wider flex items-center">
                        <CheckCircle2 size={14} className="mr-1" /> 4. Executor Agent (Final Output)
                      </p>
                      {msg.deliberation?.executor && (
                        <p className="text-sm text-green-900 mb-3 pb-3 border-b border-green-200/50 italic">
                          "{msg.deliberation.executor}"
                        </p>
                      )}
                      <p className="whitespace-pre-wrap text-sm text-gray-900 leading-relaxed font-medium">{msg.content}</p>
                    </div>
                    
                    {/* Action Indicator */}
                    {msg.actionTaken && (
                      <div className="mt-2 flex items-center text-xs text-green-700 font-bold bg-white self-start px-3 py-1.5 rounded-full border border-green-200 shadow-sm">
                        <CheckCircle2 size={14} className="mr-1.5 text-green-500" />
                        State Updated: {msg.actionTaken}
                      </div>
                    )}
                    
                    <span className="text-[10px] text-gray-400 mt-1 text-left">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start ml-4">
            <div className="flex max-w-[80%] flex-row">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 border border-gray-200 mr-3 flex items-center justify-center">
                <Network size={18} className="text-gray-500" />
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                </div>
                <span className="text-sm text-gray-600 font-medium">Swarm is deliberating...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask the FanFlow Local Swarm to navigate, analyze, or market..."
            className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2"
            disabled={isTyping}
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className={`ml-2 p-2 rounded-full transition-colors ${
              input.trim() && !isTyping ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2">
          <span className="text-[10px] text-gray-400">FanFlow Local uses a 4-agent Gemini swarm to reason and execute tasks.</span>
        </div>
      </div>
    </div>
  );
};
