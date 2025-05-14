import { useState } from "react";
import { HistoryDialog } from "../history-dialog";
import { predict } from "@/lib/api";
import { PredictionType, PredictionResult } from "@/types";
import ImageUploader from "./ImageUploader";
import PredictionHistory from "./PredictionHistory";
import PredictionResults from "./PredictionResults";
import PredictionTypeSelector from "./PredictionTypeSelector";

// New type for history
interface PredictionHistoryBatch {
  files: File[];
  results: PredictionResult[][];
}

export default function PredictionFlow() {
  const [selectedType, setSelectedType] = useState<PredictionType>("disease");
  const [files, setFiles] = useState<File[]>([]);
  const [predictedFiles, setPredictedFiles] = useState<File[]>([]);
  const [results, setResults] = useState<PredictionResult[][] | null>(null); // Array of results per file
  const [history, setHistory] = useState<PredictionHistoryBatch[]>([]); // Array of previous results
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handlePredict = async () => {
    if (!files.length) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      // For each file, run prediction (all or single type)
      const allResults = await Promise.all(
        files.map(async (file) => {
          if (selectedType === "all") {
            const endpoints = ["disease", "variety", "age"] as const;
            return await Promise.all(
              endpoints.map((type) => predict(type, file))
            );
          } else {
            const res = await predict(selectedType, file);
            return [res];
          }
        })
      );
      setResults(allResults);
      setPredictedFiles([...files]);
      setHistory((prev) => [
        { files: [...files], results: allResults },
        ...prev,
      ]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Prediction failed");
      } else {
        setError("Prediction failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Column - Input Controls */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Select Prediction Type</h2>
          <PredictionTypeSelector
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Upload Images</h2>
            {files.length > 0 && (
              <button
                className="py-1 px-3 rounded bg-destructive text-destructive-foreground font-semibold text-sm"
                onClick={() => setFiles([])}
                type="button"
              >
                Remove All
              </button>
            )}
          </div>
          <ImageUploader files={files} setFiles={setFiles} />
        </div>

        <button
          className="w-full py-2 px-4 rounded bg-primary text-primary-foreground font-semibold disabled:opacity-50"
          onClick={handlePredict}
          disabled={!files.length || loading}
        >
          {loading ? "Analyzing..." : `Analyze (${selectedType})`}
        </button>

        <div className="space-y-4">
          <PredictionHistory
            history={history}
            onShowFullHistory={() => setShowHistory(true)}
            disabled={history.length === 0}
          />
        </div>
      </div>

      {/* Right Column - Results */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Results</h2>
          <PredictionResults
            results={results}
            loading={loading}
            error={error}
            files={predictedFiles}
          />
        </div>
      </div>

      <HistoryDialog
        open={showHistory}
        onOpenChange={setShowHistory}
        history={history}
      />
    </div>
  );
}
