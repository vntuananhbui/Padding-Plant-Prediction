export type PredictionType = "disease" | "variety" | "age" | "all";

export interface PredictionResult {
  type: PredictionType;
  predictions: Array<{
    label: string;
    confidence: number;
  }>;
}
