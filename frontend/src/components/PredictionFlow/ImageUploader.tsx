import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ImageUploader({
  file,
  setFile,
}: {
  file: File | null;
  setFile: (f: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => setFile(null);

  return (
    <div
      className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer bg-muted/50 hover:bg-muted transition"
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {file ? (
        <div className="flex flex-col items-center gap-2">
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="max-h-48 rounded shadow mb-2"
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              Remove
            </Button>
            <span className="text-xs text-muted-foreground">{file.name}</span>
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
            Drag and drop your image here, or click to browse
          </p>
        </div>
      )}
      <Input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
        }}
      />
    </div>
  );
}
