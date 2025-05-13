import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { predict } from "@/lib/api";
import { Textarea } from "@/components/ui/textarea";
import {
  PredictionCard,
  getPredictionType,
} from "@/components/prediction-card";
import { HistoryDialog } from "@/components/history-dialog";

// Define a type for prediction endpoints
export type PredictionType = "disease" | "variety" | "age" | "all";

const predictionTypes: { label: string; value: PredictionType }[] = [
  { label: "Disease", value: "disease" },
  { label: "Variety", value: "variety" },
  { label: "Age", value: "age" },
  { label: "All", value: "all" },
];

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

function App() {
  const [selectedType, setSelectedType] = useState<PredictionType>("disease");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<
    PredictionResult | PredictionResult[] | null
  >(null);
  const [history, setHistory] = useState<
    (PredictionResult | PredictionResult[])[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResult(null);
      setError(null);
    }
  };

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
      } else {
        const res = await predict(selectedType, file);
        setResult(res);
        setHistory((prev) => [res, ...prev]);
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

  // Helper to render one or more prediction cards
  const renderLatestResult = (
    res: PredictionResult | PredictionResult[] | null
  ) => {
    if (!res) return null;
    if (Array.isArray(res)) {
      return (
        <div className="flex flex-col gap-2">
          {res.map((r, i) => (
            <PredictionCard key={i} h={r} type={getPredictionType(r)} />
          ))}
        </div>
      );
    }
    return <PredictionCard h={res} type={getPredictionType(res)} />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Plant Disease Prediction
          </h1>
          <p className="text-muted-foreground text-lg">
            Upload a plant image to detect diseases, variety, or age
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full lg:col-span-2">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
              <CardDescription>
                Select prediction type and upload a clear image of your plant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex gap-2 mb-4">
                  {predictionTypes.map((type) => (
                    <Button
                      key={type.value}
                      variant={
                        selectedType === type.value ? "default" : "outline"
                      }
                      onClick={() => setSelectedType(type.value)}
                    >
                      {type.label}
                    </Button>
                  ))}
                </div>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer"
                  onClick={() => inputRef.current?.click()}
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="h-10 w-10 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-muted-foreground">
                      {file
                        ? file.name
                        : "Drag and drop your image here, or click to browse"}
                    </p>
                  </div>
                  <Input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handlePredict}
                disabled={!file || loading}
              >
                {loading ? "Analyzing..." : `Analyze (${selectedType})`}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>Latest analysis results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {error && <div className="text-red-500">{error}</div>}
                {renderLatestResult(result)}
                {!result && !error && (
                  <div className="rounded-lg bg-muted p-4">
                    <p className="text-sm text-muted-foreground">
                      No prediction results yet
                    </p>
                  </div>
                )}
                <Separator />
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Previous Predictions</h4>
                  <Textarea
                    placeholder="Your prediction history will appear here..."
                    className="min-h-[100px]"
                    disabled
                    value={
                      history.length === 0
                        ? ""
                        : history
                            .slice(0, 5)
                            .map((h, i) => {
                              const details: string[] = [];
                              const arr = Array.isArray(h) ? h : [h];
                              arr.forEach((item) => {
                                if (item.result.disease)
                                  details.push(
                                    `Disease: ${item.result.disease}`
                                  );
                                if (item.result.variety)
                                  details.push(
                                    `Variety: ${item.result.variety}`
                                  );
                                if (item.result.age_days !== undefined)
                                  details.push(
                                    `Age (days): ${item.result.age_days}`
                                  );
                                else if (item.result.age !== undefined)
                                  details.push(`Age: ${item.result.age}`);
                                if (item.result.confidence !== undefined)
                                  details.push(
                                    `Confidence: ${Math.round(
                                      item.result.confidence * 100
                                    )}%`
                                  );
                                if (typeof item.result.is_healthy === "boolean")
                                  details.push(
                                    `Healthy: ${
                                      item.result.is_healthy ? "Yes" : "No"
                                    }`
                                  );
                                details.push(`Message: ${item.message}`);
                              });
                              return `#${history.length - i}: ${details.join(
                                ", "
                              )}`;
                            })
                            .join("\n\n")
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <HistoryDialog
                open={showHistory}
                onOpenChange={setShowHistory}
                history={history.flatMap((h) => (Array.isArray(h) ? h : [h]))}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowHistory(true)}
                disabled={history.length === 0}
              >
                View Full History
              </Button>
            </CardFooter>
          </Card>

          <Card className="col-span-full lg:col-span-3">
            <CardHeader>
              <CardTitle>About Plant Diseases</CardTitle>
              <CardDescription>
                Learn about common plant diseases and their treatments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Early Detection</h4>
                  <p className="text-sm text-muted-foreground">
                    Learn to identify early signs of plant diseases for better
                    treatment outcomes.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Treatment Methods</h4>
                  <p className="text-sm text-muted-foreground">
                    Discover effective treatment methods for various plant
                    diseases.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Prevention Tips</h4>
                  <p className="text-sm text-muted-foreground">
                    Get tips on preventing plant diseases and maintaining
                    healthy plants.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" className="w-full">
                Learn More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default App;
