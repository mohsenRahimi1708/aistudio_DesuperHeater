
import React from 'react';
import { AtomIcon } from './icons';

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  // Simple "markdown" to HTML renderer for demonstration.
  // It replaces newlines with <br> and **text** with <strong>text</strong>.
  // A proper library like 'marked' or 'react-markdown' would be better for full markdown support.
  const formatResult = (text: string) => {
    return text
      .split('\n')
      .map(line => line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
      )
      .join('<br />');
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-cyan-400">
        <AtomIcon className="w-7 h-7" />
        Analysis Results
      </h2>
      <div 
        className="prose prose-invert max-w-none prose-p:text-slate-300 prose-strong:text-slate-100 prose-headings:text-cyan-400 prose-ul:text-slate-300 prose-li:marker:text-cyan-400"
        dangerouslySetInnerHTML={{ __html: formatResult(result) }}
      />
    </div>
  );
};

export default ResultDisplay;
