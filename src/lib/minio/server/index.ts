import {
  createBucketIfNotExists,
  saveFileInBucket,
  checkFileExistsInBucket,
  getFileFromBucket,
  deleteFileFromBucket,
  createPresignedUrlToUpload,
  createPresignedUrlToDownload,
} from "./helpers";

import type {
  ShortFileProp,
  PresignedUrlProp,
  FileInDBProp,
} from "@/lib/minio/server/types";

export type { ShortFileProp, PresignedUrlProp, FileInDBProp };

export {
  saveFileInBucket,
  checkFileExistsInBucket,
  getFileFromBucket,
  deleteFileFromBucket,
  createPresignedUrlToUpload,
  createPresignedUrlToDownload,
};
