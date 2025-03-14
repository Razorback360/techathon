import ProfileCreateForm from "@/app/files/_components/upload-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
