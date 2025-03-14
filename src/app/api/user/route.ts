import { NextResponse } from "next/server";
import { db } from "@/server/db";
type Member = {
    name: string;
    email: string;
    nationalId: string;
    university: string;
    phone: string;
    fileId: string;
    teamName: string;
}
export async function POST(req: Request) {
  try {
    // get the files from the request body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await req.json()
    const member = (data) as Member;
    console.log(data)
    const res = await db.user.create({
        data: {
          name: member.name,
          email: member.email,
          nationalID: member.nationalId,
          university: member.university,
          mobileNumber: member.phone,
          files: {
            connect: {
              id: member.fileId,
            },
          },
          team: {
            connect: {
              tag: member.teamName
            },
          },
        },
      });
      console.log(res)
    return NextResponse.json(res);
  } catch (error) {
    console.error({ error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
