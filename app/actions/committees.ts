"use server";

import prisma from "@/lib/prisma";

export async function getCommittees() {
  return await prisma.committee.findMany({
    orderBy: { name: "asc" }
  });
}
