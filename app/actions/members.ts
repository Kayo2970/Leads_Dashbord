"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMembers() {
  return await prisma.user.findMany({
    orderBy: { fullName: "asc" },
    include: { committee: true }
  });
}
