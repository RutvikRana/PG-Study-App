import React, { useEffect, useId } from 'react';
import mermaid from 'mermaid';
import { Explanation } from '../types';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { DiagramIcon } from './icons/DiagramIcon';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  fontFamily: 'sans-serif',
  flowchart: {
    useMaxWidth: true,
  },
  themeVariables: {
    background: '#1e293b', // slate-800
    primaryColor: '#334155', // slate-700
    primaryTextColor: '#f1f5f9', // slate-100
    lineColor: '#64748b', // slate-500
    textColor: '#cbd5e1', // slate-300
    nodeBorder: '#06b6d4', // cyan-500
    mainBkg: '#06b6d4', // cyan-500
  }
});

interface ExplanationCardProps {
  info: Explanation;
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


const ExplanationCard: React.FC<ExplanationCardProps> = ({ info }) => {
  const mermaidContainerId = `mermaid-container-${useId()}`;
  const mermaidDiagramId = `mermaid-diagram-${useId()}`;

  useEffect(() => {
    const renderDiagram = async () => {
      const container = document.getElementById(mermaidContainerId);
      if (container && info.mermaidDiagram) {
         container.innerHTML = `<div class="mermaid" id="${mermaidDiagramId}"></div>`;
        try {
          const { svg } = await mermaid.render(mermaidDiagramId, info.mermaidDiagram);
          container.innerHTML = svg;
          const svgElement = container.querySelector('svg');
          if (svgElement) {
              svgElement.style.maxWidth = '100%';
              svgElement.style.height = 'auto';
          }
        } catch (e) {
          console.error("Mermaid render error:", e);
          container.innerHTML = `<p class="text-red-400">Error rendering diagram.</p><pre class="text-xs text-slate-400">${info.mermaidDiagram}</pre>`;
        }
      }
    };
    renderDiagram();
  }, [info.mermaidDiagram, mermaidContainerId, mermaidDiagramId]);

  return (
    <div className="animate-fade-in space-y-6">
      <InfoSection title="Explanation" icon={<LightbulbIcon />}>
        <p className="text-slate-300 leading-relaxed whitespace-pre-line">{info.explanation}</p>
      </InfoSection>

      <InfoSection title="Visual Pathway" icon={<DiagramIcon />}>
        <div id={mermaidContainerId} className="flex justify-center items-center w-full min-h-[200px] overflow-x-auto p-2" />
      </InfoSection>
    </div>
  );
};

export default ExplanationCard;
