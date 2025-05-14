import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

type HistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: (PredictionResult | PredictionResult[])[];
};

export default function HistoryDialog({
  open,
  onOpenChange,
  history,
}: HistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Prediction History
          </DialogTitle>
        </DialogHeader>
        {history.length === 0 ? (
          <p className="text-muted-foreground text-sm">No predictions yet.</p>
        ) : (
          <div>
            {history.flatMap((h, i) =>
              Array.isArray(h)
                ? h.map((item, j) => (
                    <PredictionCard
                      key={`${i}-${j}`}
                      h={item}
                      idx={history.length - i}
                      type={getPredictionType(item)}
                    />
                  ))
                : [
                    <PredictionCard
                      key={i}
                      h={h}
                      idx={history.length - i}
                      type={getPredictionType(h)}
                    />,
                  ]
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
