import { Button } from "@/components/ui/button";
import {
  PredictionCard,
  getPredictionType,
} from "@/components/prediction-card";

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

export default function PredictionHistory({
  history,
  onShowFullHistory,
  disabled,
}: {
  history: (PredictionResult | PredictionResult[])[];
  onShowFullHistory: () => void;
  disabled: boolean;
}) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Previous Predictions</h4>
      {history.length === 0 ? (
        <p className="text-muted-foreground text-sm">No previous predictions</p>
      ) : (
        <div className="max-h-48 overflow-y-auto flex flex-col gap-2">
          {history
            .slice(0, 5)
            .map((h, i) =>
              Array.isArray(h) ? (
                h.map((item, j) => (
                  <PredictionCard
                    key={`${i}-${j}`}
                    h={item}
                    idx={history.length - i}
                    type={getPredictionType(item)}
                  />
                ))
              ) : (
                <PredictionCard
                  key={i}
                  h={h}
                  idx={history.length - i}
                  type={getPredictionType(h)}
                />
              )
            )}
        </div>
      )}
      <Button
        variant="outline"
        className="w-full mt-2"
        onClick={onShowFullHistory}
        disabled={disabled}
      >
        View Full History
      </Button>
    </div>
  );
}
