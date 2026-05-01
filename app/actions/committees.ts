"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCommittees() {
  return await prisma.committee.findMany({
    orderBy: { name: "asc" },
    include: {
      users: true,
      tasks: true
    }
  });
}

export async function createCommittee(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.committee.create({
    data: {
      name,
      description
    }
  });

  revalidatePath("/committees");
  revalidatePath("/members");
  revalidatePath("/tasks");
}
