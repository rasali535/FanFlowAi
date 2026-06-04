import React, { useState } from 'react';
import { AppState } from '../types';
import { Database, Cpu, RefreshCw, ShieldCheck, Server, Plus, Trash2, Terminal, Brain, Eye, Route, CheckCircle2, Search, Code, Layers, Check, Play } from 'lucide-react';

interface MemoryVaultProps {
  state: AppState;
  onNavigate: (view: any, prompt?: string) => void;
}

export const MemoryVault: React.FC<MemoryVaultProps> = ({ state, onNavigate }) => {
  const [activeTab, setActiveCollectionTab] = useState<'swarm' | 'elastic_mcp'>('swarm');
  const [activeCollection, setActiveCollection] = useState<'savedPlaces' | 'campaigns' | 'activePromotions' | 'flights' | 'hotels' | 'itineraryEvents'>('savedPlaces');
  const [isSyncingFivetran, setIsSyncingFivetran] = useState(false);
  const [isLoggingArize, setIsLoggingArize] = useState(false);
  
  // Elastic Onboarding Simulation State
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false);
  const [elasticLogs, setElasticLogs] = useState<string[]>([
    "System: Ready to initialize Elasticsearch Onboarding Skill."
  ]);

  const [logs, setLogs] = useState<string[]>([
    "[Arize] Initialized observability session trace_id: ff_9a2b8c",
    "[MongoDB] Connected to persistent memory cluster: fanflow_local_db",
    "[Elastic] Connected to cloud instance: my-elasticsearch-project-ab6a4a",
    "[Fivetran] Connector 'flights_api' is active and standby",
    "[Swarm] Thinker, Analyst, Optimizer, and Executor agents initialized successfully."
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 15)]);
  };

  const addElasticLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setElasticLogs(prev => [`[${timestamp}] ${message}`, ...prev]);
  };

  const handleFivetranSync = () => {
    setIsSyncingFivetran(true);
    addLog("Fivetran: Initiating real-time ingestion of Dallas flight schedules...");
    setTimeout(() => {
      addLog("Fivetran: Ingested 142 new flight records into MongoDB.");
      addLog("MongoDB: Updated flight_schedules collection with latest June 2026 data.");
      setIsSyncingFivetran(false);
    }, 2000);
  };

  const handleArizeLog = () => {
    setIsLoggingArize(true);
    addLog("Arize: Exporting agent decision traces for trace_id: ff_9a2b8c...");
    setTimeout(() => {
      addLog("Arize: Successfully logged 4 agent traces (Thinker, Analyst, Optimizer, Executor).");
      addLog("Arize: Hallucination index: 0.02 (Excellent), Guardrails: 100% Compliant.");
      setIsLoggingArize(false);
    }, 1500);
  };

  // Run Elasticsearch Onboarding Skill Simulation
  const runElasticOnboarding = () => {
    setIsOnboarding(true);
    setOnboardingStep(1);
    setElasticLogs([]);
    
    addElasticLog("Elastic MCP: Initiating onboarding skill...");
    
    setTimeout(() => {
      addElasticLog("Elastic MCP: Pinging cluster at https://my-elasticsearch-project-ab6a4a.es.us-central1.gcp.elastic.cloud...");
      addElasticLog("Elastic MCP: Connection verified. Cluster status: GREEN.");
      setOnboardingStep(2);
      
      setTimeout(() => {
        addElasticLog("Elastic MCP: Creating index 'world_cup_local_places'...");
        addElasticLog("Elastic MCP: Configuring dense_vector mapping (1024 dimensions, cosine similarity) for semantic search...");
        setOnboardingStep(3);
        
        setTimeout(() => {
          addElasticLog("Elastic MCP: Ingesting local Dallas business documents with pre-computed Gemini vector embeddings...");
          addElasticLog("Elastic MCP: Successfully indexed 5 documents. Refreshing index...");
          setOnboardingStep(4);
          
          setTimeout(() => {
            addElasticLog("Elastic MCP: Running semantic search validation query: 'best BBQ near AT&T Stadium'...");
            addElasticLog("Elastic MCP: Top match found: 'Texas BBQ Joint' (Score: 0.945).");
            addElasticLog("Elastic MCP: Onboarding skill completed successfully! Reference architecture is fully operational.");
            setIsOnboarding(false);
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Memory Vault & Swarm Control</h2>
          <p className="text-gray-500">Monitor agentic reasoning, persistent memory, and partner integrations.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Database size={16} className="text-brand-500" />
          <span>MongoDB & Elastic MCP Connected</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 pb-3">
        <button
          onClick={() => setActiveCollectionTab('swarm')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${
            activeTab === 'swarm' 
              ? 'bg-brand-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Cpu size={16} className="mr-2" />
          Swarm Control & MongoDB
        </button>
        <button
          onClick={() => setActiveCollectionTab('elastic_mcp')}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center ${
            activeTab === 'elastic_mcp' 
              ? 'bg-indigo-600 text-white shadow-sm' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Search size={16} className="mr-2" />
          Elasticsearch Onboarding & MCP
        </button>
      </div>

      {activeTab === 'swarm' ? (
        <>
          {/* Swarm Control Center */}
          <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 text-white mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-slate-800 pb-4 gap-4">
              <div className="flex items-center space-x-3">
                <div className="bg-brand-500/10 p-2 rounded-lg text-brand-400 border border-brand-500/20">
                  <Cpu size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Swarm Control Center</h3>
                  <p className="text-xs text-slate-400">Real-time multi-agent execution & observability</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={handleFivetranSync}
                  disabled={isSyncingFivetran}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center border border-slate-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={12} className={`mr-1.5 ${isSyncingFivetran ? 'animate-spin' : ''}`} />
                  Fivetran Sync
                </button>
                <button 
                  onClick={handleArizeLog}
                  disabled={isLoggingArize}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium flex items-center border border-slate-700 transition-colors disabled:opacity-50"
                >
                  <ShieldCheck size={12} className="mr-1.5 text-green-400" />
                  Arize Trace
                </button>
              </div>
            </div>

            {/* Swarm Pipeline Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
                <Brain size={24} className="text-blue-400 mb-2" />
                <h4 className="font-bold text-sm text-slate-200">1. Thinker</h4>
                <p className="text-[10px] text-slate-400 mt-1">Formulates initial strategy & gathers context</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
                <Eye size={24} className="text-yellow-400 mb-2" />
                <h4 className="font-bold text-sm text-slate-200">2. Analyst</h4>
                <p className="text-[10px] text-slate-400 mt-1">Scrutinizes plans & identifies constraints</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
                <Route size={24} className="text-purple-400 mb-2" />
                <h4 className="font-bold text-sm text-slate-200">3. Optimizer</h4>
                <p className="text-[10px] text-slate-400 mt-1">Refines options to find the best route</p>
              </div>
              <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
                <Terminal size={24} className="text-green-400 mb-2" />
                <h4 className="font-bold text-sm text-slate-200">4. Executor</h4>
                <p className="text-[10px] text-slate-400 mt-1">Executes tool calls & updates state</p>
              </div>
            </div>

            {/* Live Terminal Logs */}
            <div className="bg-slate-950 rounded-xl p-4 font-mono text-xs text-slate-300 h-48 overflow-y-auto border border-slate-800 space-y-2">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-brand-500 mr-2">&gt;</span>
                  <span className={log.includes('[Arize]') ? 'text-blue-400' : log.includes('[Fivetran]') ? 'text-yellow-400' : log.includes('[MongoDB]') ? 'text-green-400' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MongoDB MCP Memory Vault */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="bg-green-50 p-2 rounded-lg text-green-600">
                  <Server size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">MongoDB MCP Memory Vault</h3>
                  <p className="text-xs text-gray-500">Inspect persistent collections and documents managed by the agent swarm</p>
                </div>
              </div>
              <div className="mt-2 md:mt-0 flex items-center space-x-2 text-xs text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <ShieldCheck size={14} className="text-green-500" />
                <span className="font-mono text-[10px] truncate max-w-[250px]">mongodb://atlas-sql-6a2192f2ce09e4f02d936212-bo0yaz.a.query.mongodb.net</span>
              </div>
            </div>

            {/* Collection Tabs */}
            <div className="flex flex-wrap gap-2 mb-4 border-b border-gray-100 pb-3">
              {(['savedPlaces', 'campaigns', 'activePromotions', 'flights', 'hotels', 'itineraryEvents'] as const).map((col) => (
                <button
                  key={col}
                  onClick={() => setActiveCollection(col)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeCollection === col 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {col === 'savedPlaces' ? 'saved_places' : 
                   col === 'campaigns' ? 'marketing_campaigns' : 
                   col === 'activePromotions' ? 'active_promotions' : 
                   col === 'flights' ? 'flights' : 
                   col === 'hotels' ? 'hotels' : 'itinerary_events'} ({state[col].length})
                </button>
              ))}
            </div>

            {/* JSON Document Viewer */}
            <div className="bg-slate-950 rounded-xl p-5 font-mono text-xs text-green-400 h-64 overflow-y-auto border border-slate-800">
              {state[activeCollection].length === 0 ? (
                <p className="text-slate-500 italic">// No documents found in this collection. Ask the agent to save data or create campaigns.</p>
              ) : (
                <pre className="leading-relaxed">{JSON.stringify(state[activeCollection], null, 2)}</pre>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Elasticsearch Onboarding & MCP Reference Architecture Console */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Onboarding Wizard & Status */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                    <Layers size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Elasticsearch Onboarding Skill</h3>
                    <p className="text-xs text-gray-500">Reference Architecture & Index Configuration</p>
                  </div>
                </div>
                <button
                  onClick={runElasticOnboarding}
                  disabled={isOnboarding}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center disabled:opacity-50 shadow-sm"
                >
                  <Play size={12} className="mr-1.5" />
                  Run Onboarding
                </button>
              </div>

              {/* Onboarding Steps Progress */}
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
                
                {/* Step 1 */}
                <div className="relative flex items-start pl-10">
                  <div className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white z-10 ${
                    onboardingStep >= 1 ? 'border-indigo-500 text-indigo-600' : 'border-gray-200 text-gray-400'
                  }`}>
                    {onboardingStep > 1 ? <Check size={16} /> : "1"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Verify Connection & Ping</h4>
                    <p className="text-xs text-gray-500 mt-1">Establish secure handshake with Elastic Cloud cluster using API Key authentication.</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-start pl-10">
                  <div className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white z-10 ${
                    onboardingStep >= 2 ? 'border-indigo-500 text-indigo-600' : 'border-gray-200 text-gray-400'
                  }`}>
                    {onboardingStep > 2 ? <Check size={16} /> : "2"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Configure Dense Vector Mapping</h4>
                    <p className="text-xs text-gray-500 mt-1">Define index schema with dense_vector fields for high-speed semantic search.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-start pl-10">
                  <div className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white z-10 ${
                    onboardingStep >= 3 ? 'border-indigo-500 text-indigo-600' : 'border-gray-200 text-gray-400'
                  }`}>
                    {onboardingStep > 3 ? <Check size={16} /> : "3"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Ingest & Index World Cup Data</h4>
                    <p className="text-xs text-gray-500 mt-1">Bulk index local businesses, stadium coordinates, and fan zones with vector embeddings.</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-start pl-10">
                  <div className={`absolute left-0 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white z-10 ${
                    onboardingStep >= 4 ? 'border-indigo-500 text-indigo-600' : 'border-gray-200 text-gray-400'
                  }`}>
                    {onboardingStep === 4 && !isOnboarding ? <Check size={16} /> : "4"}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-gray-900">Validate Semantic Search</h4>
                    <p className="text-xs text-gray-500 mt-1">Execute test vector queries to verify relevance scoring and hybrid search capabilities.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right: Live Elastic MCP Logs & Config */}
          <div className="space-y-6">
            <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 text-white">
              <h3 className="font-bold text-sm mb-4 flex items-center">
                <Terminal size={16} className="mr-2 text-indigo-400" />
                Elastic MCP Onboarding Logs
              </h3>
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] text-slate-300 h-64 overflow-y-auto border border-slate-800 space-y-2">
                {elasticLogs.map((log, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-indigo-400 mr-2">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center">
                <Code size={16} className="mr-2 text-indigo-600" />
                Index Mapping Schema
              </h3>
              <pre className="bg-gray-50 rounded-xl p-4 font-mono text-[10px] text-gray-700 overflow-x-auto border border-gray-100">
{`{
  "mappings": {
    "properties": {
      "name": { "type": "text" },
      "category": { "type": "keyword" },
      "location_vector": {
        "type": "dense_vector",
        "dims": 1024,
        "similarity": "cosine"
      }
    }
  }
}`}
              </pre>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
