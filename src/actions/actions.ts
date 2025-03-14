"use server";
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

type Team = {
  name: string;
  proposal: string;
}

export async function registerStudents(member: Member) {
  console.log(member);
  const test = await db.user.create({
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
  console.log(test);
}
export async function createTeam(team: Team) {
  console.log(team)
  const test = await db.team.create({
    data: {
      tag: team.name,
      proposal: team.proposal,
    },
  });
  console.log(test);
}