import React from 'react';
import { DrugInfo } from '../types';
import { MoleculeIcon } from './icons/MoleculeIcon';
import { PillIcon } from './icons/PillIcon';
import { SideEffectsIcon } from './icons/SideEffectsIcon';
import { WarningIcon } from './icons/WarningIcon';

interface DrugInfoCardProps {
  info: DrugInfo;
}

const InfoSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-slate-800/70 p-4 rounded-lg border border-slate-700 h-full transition-all duration-300 hover:border-slate-600 hover:bg-slate-800">
    <h3 className="text-md font-semibold text-cyan-400 mb-3 flex items-center gap-2">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5 text-slate-300">
    {items.map((item, index) => (
      <li key={index} className="flex items-start">
        <span className="text-cyan-400 mr-2 mt-1">&#8250;</span>
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const DrugInfoCard: React.FC<DrugInfoCardProps> = ({ info }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <header className="pb-4 border-b border-slate-700">
        <p className="text-cyan-400 font-medium">{info.drugClass}</p>
        <h2 className="text-4xl font-extrabold text-white tracking-tight">{info.genericName}</h2>
        
      </header>

      <div className="space-y-6">
         <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
                <InfoSection title="Brand Names" icon={<PillIcon />}>
                    <p className="text-slate-300">{info.brandNames.join(', ')}</p>
                </InfoSection>
            </div>
            <div className="lg:col-span-3">
                <InfoSection title="Mechanism of Action (MOA)" icon={<MoleculeIcon />}>
                    <p className="text-slate-300 leading-relaxed">{info.mechanismOfAction}</p>
                </InfoSection>
            </div>
         </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoSection title="Clinical Uses" icon={<PillIcon />}>
              <BulletList items={info.uses} />
            </InfoSection>

            <InfoSection title="Common Side Effects (S/E)" icon={<SideEffectsIcon />}>
              <BulletList items={info.sideEffects} />
            </InfoSection>

            <InfoSection title="Adverse Drug Reactions (ADRs)" icon={<WarningIcon />}>
              <BulletList items={info.adverseReactions} />
            </InfoSection>
        </div>
      </div>
    </div>
  );
};

export default DrugInfoCard;