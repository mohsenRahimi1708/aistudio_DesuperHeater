
import React, { useState, useEffect } from 'react';
import InputControl from './components/InputControl';
import ResultDisplay from './components/ResultDisplay';
import SourceList from './components/SourceList';
import HistoryPanel from './components/HistoryPanel';
import { getSuperheaterInfo } from './services/geminiService';
import { Analysis, AnalysisInput, AnalysisResult } from './types';

const App: React.FC = () => {
  const [input, setInput] = useState<AnalysisInput>({
    flow: '550',
    temperature: '350',
    pressure: '150',
    useSpray: true,
    finalTemperature: '540',
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<Analysis[]>([]);

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('analysisHistory');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('analysisHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history to localStorage", e);
    }
  }, [history]);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const analysisResult = await getSuperheaterInfo(
        input.flow,
        input.temperature,
        input.pressure,
        input.useSpray ? input.finalTemperature : undefined
      );

      const newAnalysis: Analysis = {
        id: Date.now(),
        input: { ...input },
        result: {
          text: analysisResult.text,
          sources: analysisResult.sources || [],
        },
      };

      setResult(newAnalysis.result);
      setHistory(prev => [newAnalysis, ...prev.slice(0, 19)]); // Keep last 20

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistory = (selectedAnalysis: Analysis) => {
    setInput(selectedAnalysis.input);
    setResult(selectedAnalysis.result);
    setError(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans">
      <div className="absolute inset-0 -z-10 h-full w-full bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Superheater Performance Analyzer
          </h1>
          <p className="mt-2 text-lg text-slate-400">
            AI-powered analysis of steam superheater thermodynamics and operation.
          </p>
        </header>
        
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <InputControl
              input={input}
              setInput={setInput}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
            />
            {isLoading && (
              <div className="text-center p-8 bg-slate-800/50 rounded-2xl">
                <p className="text-lg text-cyan-400 animate-pulse">Generating analysis, please wait...</p>
              </div>
            )}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
                <p className="font-bold">Error:</p>
                <p>{error}</p>
              </div>
            )}
            {result && (
              <div>
                <ResultDisplay result={result.text} />
                {result.sources && result.sources.length > 0 && (
                  <SourceList sources={result.sources} />
                )}
              </div>
            )}
          </div>
          
          <aside className="lg:col-span-1">
            <HistoryPanel
              history={history}
              onSelect={handleSelectHistory}
              onClear={handleClearHistory}
            />
          </aside>
        </main>
      </div>
    </div>
  );
};

export default App;
