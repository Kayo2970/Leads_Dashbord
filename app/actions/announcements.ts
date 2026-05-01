"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const MOCK_PROFESSOR_EMAIL = "professor@msruas.ac.in";

export async function getAnnouncements() {
  return await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      creator: true,
      committee: true
    }
  });
}

export async function createAnnouncement(formData: FormData) {
  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const target = formData.get("target") as string;
  const committeeId = formData.get("committeeId") as string;

  const professor = await prisma.user.findUnique({
    where: { email: MOCK_PROFESSOR_EMAIL }
  });

  if (!professor) throw new Error("Professor user not found");

  await prisma.announcement.create({
    data: {
      title,
      body,
      target,
      committeeId: committeeId || null,
      createdBy: professor.id
    }
  });

  revalidatePath("/announcements");
  revalidatePath("/dashboard");
}
