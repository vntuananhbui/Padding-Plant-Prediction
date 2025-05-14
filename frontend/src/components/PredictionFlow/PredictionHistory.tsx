import { Button } from "@/components/ui/button";

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

interface PredictionHistoryBatch {
  files: File[];
  results: PredictionResult[][];
}

export default function PredictionHistory({
  history,
  onShowFullHistory,
  disabled,
}: {
  history: PredictionHistoryBatch[];
  onShowFullHistory: () => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold mb-2">Previous Predictions</h4>
      {history.length === 0 ? (
        <p className="text-muted-foreground text-sm">No previous predictions</p>
      ) : (
        <div className="space-y-8"></div>
      )}
      <div className="pt-2">
        <Button
          variant="outline"
          className="w-full mt-2 text-base font-semibold"
          onClick={onShowFullHistory}
          disabled={disabled}
        >
          View Full History
        </Button>
      </div>
    </div>
  );
}
