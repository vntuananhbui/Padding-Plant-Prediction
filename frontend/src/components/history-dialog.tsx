import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PredictionCard, getPredictionType } from "./prediction-card";
import { PredictionType } from "../App";

type PredictionResult = {
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
  history: PredictionResult[];
};

export function HistoryDialog({
  open,
  onOpenChange,
  history,
}: HistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {/* The trigger button should be provided by the parent */}
        <></>
      </DialogTrigger>
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
            {history.map((h, i) => (
              <PredictionCard
                key={i}
                h={h}
                idx={history.length - i}
                type={getPredictionType(h) as PredictionType}
              />
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
