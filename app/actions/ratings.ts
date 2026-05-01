"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
const MOCK_PROFESSOR_EMAIL = "professor@msruas.ac.in";

export async function getRatings() {
  return await prisma.rating.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      subject: true,
      giver: true,
      task: { include: { event: true } }
    }
  });
}

export async function createRating(formData: FormData) {
  const subjectId = formData.get("subjectId") as string;
  const taskId = formData.get("taskId") as string;
  const score = parseInt(formData.get("score") as string, 10);
  const feedback = formData.get("feedback") as string;

  const professor = await prisma.user.findUnique({
    where: { email: MOCK_PROFESSOR_EMAIL }
  });

  if (!professor) throw new Error("Professor user not found");

  await prisma.rating.create({
    data: {
      score,
      feedback,
      subjectId,
      giverId: professor.id,
      taskId: taskId || null
    }
  });

  revalidatePath("/ratings");
}
