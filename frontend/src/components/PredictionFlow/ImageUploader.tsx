import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function mergeFiles(existing: File[], incoming: File[]): File[] {
  const map = new Map(existing.map((f) => [f.name + f.size, f]));
  for (const file of incoming) {
    const key = file.name + file.size;
    if (!map.has(key)) map.set(key, file);
  }
  return Array.from(map.values());
}

export default function ImageUploader({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (f: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(mergeFiles(files, Array.from(e.dataTransfer.files)));
    }
  };

  const handleRemove = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-muted/50 hover:bg-muted transition"
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {files.length > 0 ? (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap gap-4 justify-center">
            {files.map((file, idx) => (
              <div key={idx} className="flex flex-col items-center gap-1">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${idx + 1}`}
                  className="max-h-32 rounded shadow mb-1"
                />
                <div className="flex gap-2 items-center">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(idx);
                    }}
                  >
                    Remove
                  </Button>
                  <span className="text-xs text-muted-foreground max-w-[100px] truncate">
                    {file.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
            Drag and drop your images here, or click to browse
          </p>
        </div>
      )}
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFiles(mergeFiles(files, Array.from(e.target.files)));
          }
        }}
      />
    </div>
  );
}
