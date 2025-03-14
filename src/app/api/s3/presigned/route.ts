import type { ShortFileProp, PresignedUrlProp } from "@/lib/minio/server";
import { createPresignedUrlToUpload } from "@/lib/minio/server";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { env } from "@/env";

const bucketName = env.MINIO_BUCKET_NAME;
const expiry = 60 * 60; // 1 hour

export async function POST(req: Request) {
  try {
    // get the files from the request body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await req.json();
    const files = data as ShortFileProp[];
    console.log({ files });

    if (!files?.length) {
      return new NextResponse("No files to upload", { status: 400 });
    }

    const presignedUrls = [] as PresignedUrlProp[];

    if (files?.length) {
      // use Promise.all to get all the presigned urls in parallel
      await Promise.all(
        // loop through the files
        files.map(async (file) => {
          const fileName = nanoid(12);

          // get presigned url using s3 sdk
          const url = await createPresignedUrlToUpload({
            bucketName,
            fileName,
            expiry,
          });

          // add presigned url to the list
          presignedUrls.push({
            submitterId: file.submitterId,
            fileNameInBucket: fileName,
            originalFileName: file.originalFileName,
            fileSize: file.fileSize,
            url,
          });
        }),
      );
    }

    console.log({ presignedUrls });

    const publicUrls = presignedUrls.map((presignedUrl) => {
      const publicUrl = `http${env.MINIO_SSL === "true" ? "s" : ""}://${env.MINIO_ENDPOINT}:${env.MINIO_PORT}/${env.MINIO_BUCKET_NAME}/${presignedUrl.fileNameInBucket}`;
      return { ...presignedUrl, publicUrl };
    });

    console.log({ publicUrls });

    // Get the file name in bucket from the database
    const saveFilesInfo = await db.file.createManyAndReturn({
      data: publicUrls.map((presignedUrl) => ({
        bucket: env.MINIO_BUCKET_NAME,
        fileName: presignedUrl.fileNameInBucket,
        originalName: presignedUrl.originalFileName,
        size: presignedUrl.fileSize,
        url: presignedUrl.publicUrl,
      })),
    });

    console.log(saveFilesInfo);
    return NextResponse.json(presignedUrls);
  } catch (error) {
    console.error({ error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
