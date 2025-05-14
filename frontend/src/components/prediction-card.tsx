import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PredictionType, PredictionResult } from "@/types";

export function getPredictionType(h?: PredictionResult): PredictionType {
  if (!h || !h.result) return "disease";
  if (h.result.disease) return "disease";
  if (h.result.variety) return "variety";
  if (h.result.age_days !== undefined || h.result.age !== undefined)
    return "age";
  return "disease";
}

export function PredictionCard({
  h,
  idx,
  type,
}: {
  h: PredictionResult;
  idx?: number;
  type?: PredictionType;
}) {
  return (
    <Card className="mb-2 p-0 gap-2 pb-2">
      <CardHeader className="p-0">
        <CardTitle className="text-base bg-secondary text-secondary-foreground py-3 px-6 rounded-t-lg">
          {type ? type.charAt(0).toUpperCase() + type.slice(1) : "Prediction"}
          {typeof idx === "number" ? ` #${idx}` : ""}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={h.status === "success" ? "default" : "destructive"}>
            {h.status}
          </Badge>
          {typeof h.result.is_healthy === "boolean" && (
            <Badge variant={h.result.is_healthy ? "default" : "destructive"}>
              {h.result.is_healthy ? "Healthy" : "Unhealthy"}
            </Badge>
          )}
        </div>
        {h.result.disease && (
          <div className="mb-1">
            <span className="font-medium">Disease:</span> {h.result.disease}
          </div>
        )}
        {h.result.variety && (
          <div className="mb-1">
            <span className="font-medium">Variety:</span> {h.result.variety}
          </div>
        )}
        {h.result.age_days !== undefined ? (
          <div className="mb-1">
            <span className="font-medium">Age (days):</span> {h.result.age_days}
          </div>
        ) : (
          h.result.age !== undefined && (
            <div className="mb-1">
              <span className="font-medium">Age:</span> {h.result.age}
            </div>
          )
        )}
        {h.result.confidence !== undefined && (
          <div className="mb-1">
            <span className="font-medium">Confidence:</span>{" "}
            {Math.round(h.result.confidence * 100)}%
          </div>
        )}
        <div className="mt-2 text-muted-foreground text-sm">{h.message}</div>
      </CardContent>
    </Card>
  );
}
