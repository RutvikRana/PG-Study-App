import React, { useState, useCallback, useMemo } from 'react';
import { DrugInfo, Explanation } from '../types';
import { fetchDrugInfo, fetchExplanation } from '../services/geminiService';
import DrugInfoCard from './DrugInfoCard';
import DrugInfoCardSkeleton from './DrugInfoCardSkeleton';
import ExplanationCard from './ExplanationCard';
import ExplanationCardSkeleton from './ExplanationCardSkeleton';
import { SearchIcon } from './icons/SearchIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { WarningIcon } from './icons/WarningIcon';

type Mode = 'drug' | 'why';

const PharmaBox: React.FC = () => {
  const [mode, setMode] = useState<Mode>('drug');
  const [prompt, setPrompt] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    setPrompt('');
    setDrugInfo(null);
    setExplanation(null);
    setError(null);
  };

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a value.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDrugInfo(null);
    setExplanation(null);

    try {
      if (mode === 'drug') {
        const data = await fetchDrugInfo(prompt);
        if (data.error) {
          setError(data.error);
        } else {
          setDrugInfo(data);
        }
      } else {
        const data = await fetchExplanation(prompt);
         if (data.error) {
          setError(data.error);
        } else {
          setExplanation(data);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, mode]);
  
  const { title, placeholder } = useMemo(() => {
    if (mode === 'drug') {
      return {
        title: 'Pharma Quick Lookup',
        placeholder: 'Enter a drug name (e.g., Atorvastatin)'
      };
    }
    return {
      title: 'Conceptual Explainer',
      placeholder: 'Ask a "why" question (e.g., Why does Amphotericin B cause metabolic acidosis?)'
    };
  }, [mode]);

  const activeModeClass = "bg-cyan-600/50 text-cyan-200 border-cyan-500";
  const inactiveModeClass = "bg-transparent text-slate-400 hover:bg-slate-700/50 border-transparent";

  return (
    <section className="bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold text-cyan-300">{title}</h2>
        <div role="radiogroup" className="flex bg-slate-900/70 p-1 rounded-lg border border-slate-700 self-start">
          <button role="radio" aria-checked={mode === 'drug'} onClick={() => handleModeChange('drug')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 border ${mode === 'drug' ? activeModeClass : inactiveModeClass}`}>
            Drug Lookup
          </button>
          <button role="radio" aria-checked={mode === 'why'} onClick={() => handleModeChange('why')} className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-all duration-200 border ${mode === 'why' ? activeModeClass : inactiveModeClass}`}>
            Explain Why
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
          disabled={isLoading}
          aria-label="Search input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon /> : <SearchIcon />}
          <span className="ml-2">{isLoading ? 'Thinking...' : 'Search'}</span>
        </button>
      </form>

      <div className="mt-8 min-h-[300px]">
        {isLoading && mode === 'drug' && <DrugInfoCardSkeleton />}
        {isLoading && mode === 'why' && <ExplanationCardSkeleton />}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg flex items-center justify-center text-center">
            <WarningIcon className="h-6 w-6 mr-3 flex-shrink-0" />
            <div>
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          </div>
        )}
        {drugInfo && !isLoading && <DrugInfoCard info={drugInfo} />}
        {explanation && !isLoading && <ExplanationCard info={explanation} />}
      </div>
    </section>
  );
};

export default PharmaBox;