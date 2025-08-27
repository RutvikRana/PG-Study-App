
import React, { useState, useCallback } from 'react';
import { DrugInfo } from '../types';
import { fetchDrugInfo } from '../services/geminiService';
import DrugInfoCard from './DrugInfoCard';
import { SearchIcon } from './icons/SearchIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

const PharmaBox: React.FC = () => {
  const [drugName, setDrugName] = useState('');
  const [drugInfo, setDrugInfo] = useState<DrugInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!drugName.trim()) {
      setError('Please enter a drug name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDrugInfo(null);

    try {
      const data = await fetchDrugInfo(drugName);
      if (data.error) {
        setError(data.error);
        setDrugInfo(null);
      } else {
        setDrugInfo(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setDrugInfo(null);
    } finally {
      setIsLoading(false);
    }
  }, [drugName]);

  return (
    <section className="bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-300">Pharma Quick Lookup</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={drugName}
          onChange={(e) => setDrugName(e.target.value)}
          placeholder="Enter a drug name (e.g., Atorvastatin)"
          className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? <SpinnerIcon /> : <SearchIcon />}
          <span className="ml-2">{isLoading ? 'Searching...' : 'Search'}</span>
        </button>
      </form>

      <div className="mt-8 min-h-[200px]">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-slate-400">
            <SpinnerIcon />
            <p className="mt-2">Fetching pharmacological data...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}
        {drugInfo && !isLoading && <DrugInfoCard info={drugInfo} />}
      </div>
    </section>
  );
};

export default PharmaBox;
   