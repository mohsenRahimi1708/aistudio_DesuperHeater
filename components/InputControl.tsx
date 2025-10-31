
import React from 'react';
import { AnalysisInput } from '../types';

interface InputControlProps {
  input: AnalysisInput;
  setInput: React.Dispatch<React.SetStateAction<AnalysisInput>>;
  onAnalyze: () => void;
  isLoading: boolean;
}

const InputControl: React.FC<InputControlProps> = ({ input, setInput, onAnalyze, isLoading }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Superheater Analysis</h2>
      <form onSubmit={(e) => { e.preventDefault(); onAnalyze(); }} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="flow" className="block text-sm font-medium text-slate-300 mb-2">Steam Flow (t/h)</label>
            <input
              type="number"
              name="flow"
              id="flow"
              value={input.flow}
              onChange={handleInputChange}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="e.g., 550"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="temperature" className="block text-sm font-medium text-slate-300 mb-2">Inlet Temperature (°C)</label>
            <input
              type="number"
              name="temperature"
              id="temperature"
              value={input.temperature}
              onChange={handleInputChange}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="e.g., 350"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="pressure" className="block text-sm font-medium text-slate-300 mb-2">Pressure (bar)</label>
            <input
              type="number"
              name="pressure"
              id="pressure"
              value={input.pressure}
              onChange={handleInputChange}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="e.g., 150"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="useSpray"
              name="useSpray"
              type="checkbox"
              checked={input.useSpray}
              onChange={handleInputChange}
              className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-slate-600 rounded bg-slate-700"
              disabled={isLoading}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="useSpray" className="font-medium text-slate-300">Use Attemperator Spray</label>
            <p className="text-slate-400">Include analysis of spray water to control final temperature.</p>
          </div>
        </div>
        {input.useSpray && (
          <div>
            <label htmlFor="finalTemperature" className="block text-sm font-medium text-slate-300 mb-2">Final Outlet Temperature (°C)</label>
            <input
              type="number"
              name="finalTemperature"
              id="finalTemperature"
              value={input.finalTemperature}
              onChange={handleInputChange}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder="e.g., 540"
              required={input.useSpray}
              disabled={isLoading}
            />
          </div>
        )}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : 'Analyze Parameters'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputControl;
