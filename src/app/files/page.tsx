import ProfileCreateForm from "@/app/files/_components/upload-form";
import UploadGallery from "@/app/files/_components/upload-gallery";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function UppyDashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-1 h-fit">
        <CardHeader>Upload</CardHeader>
        <CardContent>
          <ProfileCreateForm />
        </CardContent>
      </Card>
    </div>
  );
}
