import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PredictionCard, getPredictionType } from "./prediction-card";
import { PredictionResult } from "@/types";

interface PredictionHistoryBatch {
  files: File[];
  results: PredictionResult[][];
}

type HistoryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  history: PredictionHistoryBatch[];
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
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold mb-4">
            Prediction History
          </DialogTitle>
        </DialogHeader>
        {history.length === 0 ? (
          <p className="text-muted-foreground text-sm">No predictions yet.</p>
        ) : (
          <div className="space-y-10">
            {history.map((batch, batchIdx) => (
              <div key={batchIdx} className="mb-2">
                <div className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                  <span className="bg-primary/10 px-3 py-1 rounded-full">
                    Batch #{history.length - batchIdx}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {batch.results.map((fileResults, fileIdx) => (
                    <div
                      key={fileIdx}
                      className="bg-white dark:bg-zinc-900 rounded-xl shadow p-4 flex flex-col items-center border border-muted/40"
                    >
                      {batch.files[fileIdx] && (
                        <img
                          src={URL.createObjectURL(batch.files[fileIdx])}
                          alt={`History image ${fileIdx + 1}`}
                          className="w-32 h-32 object-cover rounded mb-3 border"
                        />
                      )}
                      <div className="w-full space-y-3">
                        {fileResults.map((result, resIdx) => (
                          <div key={resIdx} className="">
                            <PredictionCard
                              h={result}
                              idx={
                                fileResults.length > 1 ? resIdx + 1 : undefined
                              }
                              type={getPredictionType(result)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
