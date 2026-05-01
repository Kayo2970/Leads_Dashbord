"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getCommittees() {
  return await prisma.committee.findMany({
    orderBy: { name: "asc" }
  });
}
