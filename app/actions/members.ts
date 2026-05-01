"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMembers() {
  return await prisma.user.findMany({
    orderBy: { fullName: "asc" },
    include: { committee: true }
  });
}

export async function createMember(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const designation = formData.get("designation") as string;
  const committeeId = formData.get("committeeId") as string;

  await prisma.user.create({
    data: {
      fullName,
      email,
      role,
      designation: designation || null,
      committeeId: committeeId || null
    }
  });

  revalidatePath("/members");
}

export async function updateMember(userId: string, formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const role = formData.get("role") as string;
  const designation = formData.get("designation") as string;
  const committeeId = formData.get("committeeId") as string;
  const email = formData.get("email") as string;

  await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
      role,
      designation,
      committeeId: committeeId || null,
      email
    }
  });

  revalidatePath("/members");
  revalidatePath("/dashboard");
}
