// /* eslint-disable @next/next/no-img-element */
// import { Card, CardContent } from "@/components/ui/card";
// import { cn } from "@/lib/utils";
// // import { api } from "@/trpc/server";
// import { formatDistanceToNow } from "date-fns";
// import { File } from "lucide-react";
// import { toast } from "sonner";

// export default async function UploadGallery() {
//   const files = await api.files.getAll();

//   if (!files) {
//     toast.error("Something went wrong");
//     return <div>Something went wrong</div>;
//   }

//   return (
//     <div className="grid grid-cols-4 gap-2">
//       {files.map((file) => (
//         <FileCard key={file.id} {...file} className="w-full" />
//       ))}
//     </div>
//   );
// }

// const FileCard = ({
//   fileName,
//   originalName,
//   size,
//   url,
//   createdAt,
//   className,
// }: {
//   className?: string;
//   id: string;
//   bucket: string | null;
//   fileName: string | null;
//   originalName: string | null;
//   size: number | null;
//   url: string | null;
//   createdAt: Date;
// }) => {
//   const displayName = originalName ?? fileName ?? "Unnamed File";
//   const formattedSize = size
//     ? `${(size / 1024 / 1024).toFixed(2)} MB`
//     : "Unknown size";
//   const formattedDate = formatDistanceToNow(new Date(createdAt), {
//     addSuffix: true,
//   });

//   return (
//     <Card
//       className={cn(
//         "flex aspect-square w-full cursor-pointer flex-col justify-between transition-shadow duration-300 hover:shadow-lg",
//         className,
//       )}
//     >
//       <CardContent className="flex h-full flex-col items-center justify-center p-4">
//         <File className="mb-4 h-16 w-16 text-gray-400" />
//         <h3
//           className="mb-2 line-clamp-2 text-wrap break-words text-center font-semibold"
//           title={displayName}
//         >
//           {displayName}
//         </h3>
//         <p className="mb-1 text-center text-sm text-gray-500">
//           {formattedSize}
//         </p>
//         <p className="text-center text-xs text-gray-400">{formattedDate}</p>
//       </CardContent>
//     </Card>
//   );
// };
