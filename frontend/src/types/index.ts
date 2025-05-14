export type PredictionResult = {
  status: string;
  result: {
    disease?: string;
    variety?: string;
    age?: string | number;
    confidence?: number;
    is_healthy?: boolean;
    age_days?: number;
    [key: string]: unknown;
  };
  message: string;
};