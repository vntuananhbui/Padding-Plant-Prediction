import { PredictionResult } from "@/types";

function ResultCard({
  file,
  resultArr,
}: {
  file: File;
  resultArr: PredictionResult[];
}) {
  // Find the first result with is_healthy defined (if any)
  const firstWithHealth = resultArr.find(
    (r) => r.result.is_healthy !== undefined
  );
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow border border-muted/20 p-0 flex flex-col items-center overflow-hidden transition hover:shadow-lg">
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
    </div>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {results.map((resultArr, idx) => (
        <ResultCard key={idx} file={files[idx]} resultArr={resultArr} />
      ))}
    </div>
  );
}
