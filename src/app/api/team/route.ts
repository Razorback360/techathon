import { NextResponse } from "next/server";
import { db } from "@/server/db";
type Team = {
    name: string;
    proposal: string;
}
export async function POST(req: Request) {
  try {
    // get the files from the request body
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = await req.json()
    const team = (data) as Team;
    console.log(data)

    const res = await db.team.create({
        data: {
          tag: team.name,
          proposal: team.proposal,
        },
      });
      console.log(res)

    return NextResponse.json(res);
  } catch (error) {
    console.error({ error });
    return new NextResponse("Internal error", { status: 500 });
  }
}
