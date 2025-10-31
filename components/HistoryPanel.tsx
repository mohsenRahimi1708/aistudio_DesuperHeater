import React from 'react';
import { Analysis } from '../types';
import { HistoryIcon, TrashIcon, WindIcon, ThermometerIcon, ZapIcon } from './icons';

interface HistoryPanelProps {
  history: Analysis[];
  onSelect: (analysis: Analysis) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center gap-3 text-cyan-400">
          <HistoryIcon className="w-6 h-6" />
          Analysis History
        </h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors"
            aria-label="Clear history"
          >
            <TrashIcon className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center text-slate-400 py-10">
          <p>No past analyses found.</p>
          <p className="text-sm">Your results will be saved here.</p>
        </div>
      ) : (
        <ul className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 -mr-2">
          {history.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSelect(item)}
                className="w-full text-left p-4 bg-slate-900/50 hover:bg-slate-700/50 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
              >
                <p className="font-semibold text-slate-200 mb-2">
                  {new Date(item.id).toLocaleString()}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5"><WindIcon className="w-4 h-4" /> {item.input.flow} t/h</span>
                  <span className="flex items-center gap-1.5"><ThermometerIcon className="w-4 h-4" /> {item.input.temperature}°C</span>
                  <span className="flex items-center gap-1.5"><ZapIcon className="w-4 h-4" /> {item.input.pressure} bar</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPanel;
