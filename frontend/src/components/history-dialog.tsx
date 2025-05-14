import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PredictionCard, getPredictionType } from "./prediction-card";
import { PredictionResult } from "@/types";

type HistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: (PredictionResult | PredictionResult[])[];
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
            {history.map((h, i) =>
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
      </DialogContent>
    </Dialog>
  );
}
