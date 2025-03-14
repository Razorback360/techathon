"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatBytes
} from "@/lib/minio/client";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import useUploadFile from "@/hooks/use-upload-file";
import { Separator } from "@/components/ui/separator";

export default function UploadForm() {
  const {
    isLoading,
    files,
    onFileUploadChange,
    onUploadFile,
    progress,
    onCancelFile,
  } = useUploadFile();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onUploadFile();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileUploadChange(e);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <Input
          type="file"
          multiple
          disabled={isLoading}
          onChange={handleFileChange}
        />

        <Button
          type="submit"
          disabled={isLoading || files.length < 1}
          className="w-full"
        >
          {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
          Upload
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={onCancelFile}
        >
          Cancel
        </Button>
      </form>

      {/* show files list with progress number next to each file */}
      <div className="mt-4">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex flex-col items-stretch justify-center gap-2"
          >
            <div className="flex-grow">
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {formatBytes(file.size)}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Separator className="w-full" />
      <div className="flex items-center gap-2">
        <Progress value={progress} className="w-full" />
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">{progress}%</p>
        </div>
      </div>
    </div>
  );
}
