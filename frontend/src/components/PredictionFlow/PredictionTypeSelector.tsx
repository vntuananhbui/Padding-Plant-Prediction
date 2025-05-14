import { Button } from "@/components/ui/button";
import { PredictionType } from "@/types";

const options: { label: string; value: PredictionType }[] = [
  { label: "Disease", value: "disease" },
  { label: "Variety", value: "variety" },
  { label: "Age", value: "age" },
  { label: "All", value: "all" },
];

export default function PredictionTypeSelector({
  selectedType,
  setSelectedType,
}: {
  selectedType: PredictionType;
  setSelectedType: (type: PredictionType) => void;
}) {
  return (
    <div className="flex gap-2 justify-center">
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={selectedType === opt.value ? "default" : "outline"}
          onClick={() => setSelectedType(opt.value)}
          className="px-6"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
