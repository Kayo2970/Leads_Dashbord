"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Updated to use the Root user email as a fallback for task creation
const MOCK_PROFESSOR_EMAIL = "root@leads.msruas.ac.in";

export async function getTasks(searchParams?: { sort?: string; filter?: string }) {
  const where: any = {};
  
  if (searchParams?.filter && searchParams.filter !== "all") {
    where.status = searchParams.filter;
  }

  const orderBy: any = {};
  if (searchParams?.sort === "deadline_desc") {
    orderBy.deadline = "desc";
  } else if (searchParams?.sort === "title") {
    orderBy.title = "asc";
  } else {
    orderBy.deadline = "asc"; // Default: Soonest first
  }

  return await prisma.task.findMany({
    where,
    orderBy,
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

  if (!professor) throw new Error("Admin user not found");

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

export async function updateTask(taskId: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const deadlineStr = formData.get("deadline") as string;
  const status = formData.get("status") as string;
  const assignedTo = formData.get("assignedTo") as string;

  await prisma.task.update({
    where: { id: taskId },
    data: {
      title,
      description,
      deadline: new Date(deadlineStr),
      status,
      assignedTo: assignedTo || null,
    }
  });

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}
