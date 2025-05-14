import { useState } from "react";
import { HistoryDialog } from "../history-dialog";
import { predict } from "@/lib/api";
import { PredictionType, PredictionResult } from "@/types";
import ImageUploader from "./ImageUploader";
import PredictionHistory from "./PredictionHistory";
import PredictionResults from "./PredictionResults";
import PredictionTypeSelector from "./PredictionTypeSelector";

export default function PredictionFlow() {
  const [selectedType, setSelectedType] = useState<PredictionType>("disease");
  const [file, setFile] = useState<File | null>(null);
  const [predictedFile, setPredictedFile] = useState<File | null>(null);
  const [result, setResult] = useState<
    PredictionResult | PredictionResult[] | null
  >(null);
  const [history, setHistory] = useState<
    (PredictionResult | PredictionResult[])[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const handlePredict = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      if (selectedType === "all") {
        const endpoints = ["disease", "variety", "age"] as const;
        const results = await Promise.all(
          endpoints.map((type) => predict(type, file))
        );
        setResult(results);
        setHistory((prev) => [results, ...prev]);
        setPredictedFile(file);
      } else {
        const res = await predict(selectedType, file);
        setResult(res);
        setHistory((prev) => [res, ...prev]);
        setPredictedFile(file);
      }
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
          <h2 className="text-lg font-semibold">Upload Image</h2>
          <ImageUploader file={file} setFile={setFile} />
        </div>

        <button
          className="w-full py-2 px-4 rounded bg-primary text-primary-foreground font-semibold disabled:opacity-50"
          onClick={handlePredict}
          disabled={!file || loading}
        >
          {loading ? "Analyzing..." : `Analyze (${selectedType})`}
        </button>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Previous Predictions</h2>
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
            result={result}
            loading={loading}
            error={error}
            file={predictedFile}
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
