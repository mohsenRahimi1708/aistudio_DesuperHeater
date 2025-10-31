
import React from 'react';
import { Source } from '../types';
import { LinkIcon } from './icons';

interface SourceListProps {
  sources: Source[];
}

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700">
      <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-300">
        <LinkIcon className="w-5 h-5"/>
        Sources
      </h3>
      <ul className="space-y-2">
        {sources.map((source, index) => (
          <li key={index}>
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors text-sm"
            >
              {source.title || source.uri}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourceList;
