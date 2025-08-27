import React from 'react';
import PharmaBox from './components/PharmaBox';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans p-4 sm:p-6 lg:p-8 selection:bg-cyan-300 selection:text-cyan-900">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            PG Study Tools
          </h1>
          <p className="mt-2 text-slate-400">Your advanced medical study assistant.</p>
        </header>

        <main>
          <PharmaBox />
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by Gemini API. For educational purposes only.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;