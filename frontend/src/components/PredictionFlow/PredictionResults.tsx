import { Separator } from "@/components/ui/separator";
import { PredictionResult } from "@/types";

function ResultDisplay({ result }: { result: PredictionResult }) {
  const { disease, variety, age_days, age, confidence, is_healthy } =
    result.result;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 mb-2">
        {disease && (
          <span className="font-bold text-lg">
            Disease: <span className="font-normal">{disease}</span>
          </span>
        )}
        {variety && (
          <span className="font-bold text-lg">
            Variety: <span className="font-normal">{variety}</span>
          </span>
        )}
        {is_healthy !== undefined && (
          <span
            className={
              is_healthy
                ? "bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold"
                : "bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-semibold"
            }
          >
            {is_healthy ? "Healthy" : "Unhealthy"}
          </span>
        )}
      </div>
      {age_days !== undefined && (
        <div>
          <span className="font-bold">Age (days):</span> {age_days}
        </div>
      )}
      {age !== undefined && (
        <div>
          <span className="font-bold">Age:</span> {age}
        </div>
      )}
      {confidence !== undefined && (
        <div>
          <span className="font-bold">Confidence:</span>{" "}
          {Math.round(confidence * 100)}%
        </div>
      )}
      <div className="text-muted-foreground text-sm mt-2">{result.message}</div>
    </div>
  );
}

export default function PredictionResults({
  result,
  loading,
  error,
  file,
}: {
  result: PredictionResult | PredictionResult[] | null;
  loading: boolean;
  error: string | null;
  file?: File | null;
}) {
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  if (loading) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-muted-foreground">
        Analyzing image...
      </div>
    );
  }
  if (!result) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-muted-foreground">
        No prediction results yet
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {file && result && !loading && !error && (
        <div className="rounded-lg overflow-hidden border">
          <img
            src={URL.createObjectURL(file)}
            alt="Uploaded plant"
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      {Array.isArray(result) ? (
        result.map((r, i) => (
          <div key={i} className="mb-6">
            <ResultDisplay result={r} />
            {i < result.length - 1 && <Separator className="my-4" />}
          </div>
        ))
      ) : (
        <ResultDisplay result={result} />
      )}
    </div>
  );
}
