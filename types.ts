export interface Source {
  uri: string;
  title: string;
}

export interface AnalysisInput {
  flow: string;
  temperature: string;
  pressure: string;
  useSpray: boolean;
  finalTemperature: string;
}

export interface AnalysisResult {
  text: string;
  sources: Source[];
}

export interface Analysis {
  id: number; // Using timestamp for a simple unique ID
  input: AnalysisInput;
  result: AnalysisResult;
}
