"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();
const MOCK_PROFESSOR_EMAIL = "professor@msruas.ac.in";

export async function getTasks() {
  return await prisma.task.findMany({
    orderBy: { deadline: "asc" },
    include: {
      event: true,
      assignee: true,
      committee: true,
      creator: true
    }
  });
}

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const deadlineStr = formData.get("deadline") as string;
  const eventId = formData.get("eventId") as string;
  const assignedTo = formData.get("assignedTo") as string;

  const professor = await prisma.user.findUnique({
    where: { email: MOCK_PROFESSOR_EMAIL }
  });

  if (!professor) throw new Error("Professor user not found");

  await prisma.task.create({
    data: {
      title,
      description,
      deadline: new Date(deadlineStr),
      status: "pending",
      eventId: eventId || null,
      assignedTo: assignedTo || null,
      createdBy: professor.id
    }
  });

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}
