
import React from 'react';
import { DrugInfo } from '../types';

interface DrugInfoCardProps {
  info: DrugInfo;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
    <h3 className="text-lg font-semibold text-cyan-400 mb-2">{title}</h3>
    {children}
  </div>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-disc list-inside space-y-1 text-slate-300">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

const DrugInfoCard: React.FC<DrugInfoCardProps> = ({ info }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <header className="text-center">
        <h2 className="text-3xl font-bold text-white">{info.genericName}</h2>
        <p className="text-slate-400">({info.drugClass})</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoSection title="Brand Names">
          <p className="text-slate-300">{info.brandNames.join(', ')}</p>
        </InfoSection>

        <InfoSection title="Mechanism of Action (MOA)">
          <p className="text-slate-300 leading-relaxed">{info.mechanismOfAction}</p>
        </InfoSection>

        <InfoSection title="Clinical Uses">
          <BulletList items={info.uses} />
        </InfoSection>

        <InfoSection title="Common Side Effects (S/E)">
          <BulletList items={info.sideEffects} />
        </InfoSection>

        <InfoSection title="Adverse Drug Reactions (ADRs)">
          <BulletList items={info.adverseReactions} />
        </InfoSection>
      </div>
    </div>
  );
};

export default DrugInfoCard;
   