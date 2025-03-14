import { env } from "@/env";
import * as Minio from "minio";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForMinio = globalThis as unknown as {
  minioClient: Minio.Client | undefined;
};

const minioClient = globalForMinio.minioClient ?? new Minio.Client({
  endPoint: env.MINIO_ENDPOINT,
  port: env.MINIO_PORT,
  useSSL: env.MINIO_SSL === 'true',
  accessKey: env.MINIO_ACCESS_KEY,
  secretKey: env.MINIO_SECRET_KEY,
})
if (env.NODE_ENV !== "production") globalForMinio.minioClient = minioClient;

export const minio = minioClient;