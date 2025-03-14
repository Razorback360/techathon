"use client";

import { useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import {
  getPresignedUrls,
  handleUpload,
  MAX_FILE_SIZE_NEXTJS_ROUTE,
  validateFiles,
} from "@/lib/minio/client";
import { toast } from "sonner";

const useUploadFile = () => {
  const [progress, setProgress] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      setFiles(Array.from(fileList)); 
    }

    if (files.length) {
      // Create the expected ShortFileProp array for the API
      const shortFileProps = files.map((file) => ({
        submitterId: "1",
        originalFileName: file.name,
        fileSize: file.size,
      }));

      // Validate files before uploading
      const error = validateFiles(shortFileProps, MAX_FILE_SIZE_NEXTJS_ROUTE);
      if (error) {
        toast.error(error);
        return;
      }
    }
  };

  const onCancelFile = () => {
    setFiles([]);
    setIsLoading(false);
  };

  const onUploadFile = async () => {
    setIsLoading(true);
    try {
      setIsLoading(true);

      if (files.length) {
        // Create the expected ShortFileProp array for the API
        const shortFileProps = files.map((file) => ({
          submitterId: "1",
          originalFileName: file.name,
          fileSize: file.size,
        }));

        // Validate files before uploading
        const error = validateFiles(shortFileProps, MAX_FILE_SIZE_NEXTJS_ROUTE);
        if (error) {
          toast.error(error);
          return;
        }

        // Get presigned URLs from the API
        const presignedUrls = await getPresignedUrls(shortFileProps);

        // Upload files using presigned URLs
        await handleUpload(
          files,
          presignedUrls,
          () => {
            toast.success("Files uploaded successfully");
            setFiles([]); // Clear files after successful upload
          },
          setProgress,
          setRemaining,
        );

        // reload
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    progress,
    remaining,
    isLoading,
    files,
    onFileUploadChange,
    onCancelFile,
    onUploadFile,
  };
};

export default useUploadFile;
