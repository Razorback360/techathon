"use server";
import { string, z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

// id           String   @id @default(cuid())
//     email        String   @unique
//     name         String?
//     createdAt    DateTime @default(now())
//     studentId    String?
//     nationalID   String?
//     proposal     String
//     mobileNumber String

const extended = z.object({
  name: z.string(),
  email: z.string(),
  isKfupm: z.string(),
  phoneNum: z.string(),
  proposal: z.string(),
  teamTag: z.string(),
  studentId: z.string().optional(),
  nationalId: z.string().optional(),
});

export async function registerStudents(formData: FormData) {
  const {teamTag, ...data} = extended.omit({isKfupm:true}).parse({
    name: formData.get("name"),
    phoneNum: formData.get("phoneNum"),
    proposal: formData.get("proposal"),
    studentId: formData.get("studentId"),
    nationalID: formData.get("nationalId"),
    teamTag: formData.get("teamTag"),
    email: formData.get("email")
  });


  await db.user.create({
    data: {
      ...data,
      team: {
        connectOrCreate: {
          create: {
            tag: teamTag,
          },
          where: {
            tag: teamTag,
          },
        },
      },
    },
  });

  //   revalidatePath('/dashboard/invoices');
  //   redirect('/dashboard/invoices');
}
