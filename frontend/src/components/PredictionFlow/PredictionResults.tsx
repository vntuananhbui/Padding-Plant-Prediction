import { useState } from "react";
import { PredictionResult } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ResultCard({
  file,
  resultArr,
  onClick,
}: {
  file: File;
  resultArr: PredictionResult[];
  onClick: () => void;
}) {
  // Find the first result with is_healthy defined (if any)
  const firstWithHealth = resultArr.find(
    (r) => r.result.is_healthy !== undefined
  );
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow border border-muted/20 p-0 flex flex-col items-center overflow-hidden transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
      style={{ minWidth: 0 }}
    >
      {/* Image with badge */}
      <div className="relative w-full flex justify-center pt-6 pb-4 bg-muted/40">
        <img
          src={URL.createObjectURL(file)}
          alt="Prediction preview"
          className="w-32 h-32 object-cover rounded-xl shadow border border-muted/30"
        />
        {firstWithHealth && (
          <span
            className={
              (firstWithHealth.result.is_healthy
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800") +
              " px-4 py-1 rounded-lg text-base font-semibold absolute top-2 right-4 shadow"
            }
            style={{ zIndex: 2 }}
          >
            {firstWithHealth.result.is_healthy ? "Healthy" : "Unhealthy"}
          </span>
        )}
      </div>
      {/* Prediction info block */}
      <div className="w-full flex flex-col gap-4 px-6 pb-6 pt-2">
        {resultArr.map((result, j) => (
          <div
            key={j}
            className="bg-muted/20 rounded-xl p-4 flex flex-col gap-2 border border-muted/10"
          >
            {result.result.disease && (
              <div className="font-bold text-base text-red-700 break-words">
                Disease:{" "}
                <span className="font-normal text-foreground">
                  {result.result.disease}
                </span>
              </div>
            )}
            {result.result.variety && (
              <div className="font-bold text-base text-blue-700 break-words">
                Variety:{" "}
                <span className="font-normal text-foreground">
                  {result.result.variety}
                </span>
              </div>
            )}
            {result.result.age_days !== undefined && (
              <div className="font-bold text-base text-green-700">
                Age (days):{" "}
                <span className="font-normal text-foreground">
                  {result.result.age_days}
                </span>
              </div>
            )}
            {result.result.confidence !== undefined && (
              <div className="text-sm text-muted-foreground">
                Confidence: {Math.round(result.result.confidence * 100)}%
              </div>
            )}
          </div>
        ))}
      </div>
    </button>
  );
}

function ResultDialog({
  open,
  onOpenChange,
  file,
  resultArr,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  file: File;
  resultArr: PredictionResult[];
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          {/* Left: Prediction info */}
          <div className="flex-1 p-6 flex flex-col gap-4 bg-white dark:bg-zinc-900">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-4">
                Prediction Details
              </DialogTitle>
            </DialogHeader>
            {resultArr.map((result, j) => (
              <div
                key={j}
                className="bg-muted/20 rounded-xl p-4 flex flex-col gap-2 border border-muted/10"
              >
                {result.result.disease && (
                  <div className="font-bold text-base text-red-700 break-words">
                    Disease:{" "}
                    <span className="font-normal text-foreground">
                      {result.result.disease}
                    </span>
                  </div>
                )}
                {result.result.variety && (
                  <div className="font-bold text-base text-blue-700 break-words">
                    Variety:{" "}
                    <span className="font-normal text-foreground">
                      {result.result.variety}
                    </span>
                  </div>
                )}
                {result.result.age_days !== undefined && (
                  <div className="font-bold text-base text-green-700">
                    Age (days):{" "}
                    <span className="font-normal text-foreground">
                      {result.result.age_days}
                    </span>
                  </div>
                )}
                {result.result.confidence !== undefined && (
                  <div className="text-sm text-muted-foreground">
                    Confidence: {Math.round(result.result.confidence * 100)}%
                  </div>
                )}
                {typeof result.result.is_healthy === "boolean" && (
                  <span
                    className={
                      result.result.is_healthy
                        ? "bg-green-200 text-green-800 px-2 py-0.5 rounded text-xs font-semibold w-fit mt-1"
                        : "bg-red-200 text-red-800 px-2 py-0.5 rounded text-xs font-semibold w-fit mt-1"
                    }
                  >
                    {result.result.is_healthy ? "Healthy" : "Unhealthy"}
                  </span>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  {result.message}
                </div>
              </div>
            ))}
          </div>
          {/* Right: Full image */}
          <div className="flex-1 bg-muted/40 flex items-center justify-center p-6">
            <img
              src={URL.createObjectURL(file)}
              alt="Full prediction preview"
              className="max-h-[60vh] w-auto rounded-2xl shadow border border-muted/30"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PredictionResults({
  results,
  loading,
  error,
  files,
}: {
  results: PredictionResult[][] | null;
  loading: boolean;
  error: string | null;
  files: File[];
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (loading) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-muted-foreground">
        Analyzing image{files.length > 1 ? "s" : ""}...
      </div>
    );
  }
  if (!results || results.length === 0) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-muted-foreground">
        No prediction results yet
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {results.map((resultArr, idx) => (
          <ResultCard
            key={idx}
            file={files[idx]}
            resultArr={resultArr}
            onClick={() => setSelectedIdx(idx)}
          />
        ))}
      </div>
      {selectedIdx !== null && results[selectedIdx] && files[selectedIdx] && (
        <ResultDialog
          open={selectedIdx !== null}
          onOpenChange={() => setSelectedIdx(null)}
          file={files[selectedIdx]}
          resultArr={results[selectedIdx]}
        />
      )}
    </>
  );
}
