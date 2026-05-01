"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const MOCK_USER_EMAIL = "root@leads.msruas.ac.in";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const eventId = formData.get("eventId") as string;
  const deadline = formData.get("deadline") as string;
  const priority = formData.get("priority") as string;
  const assigneeIds = formData.getAll("assigneeIds") as string[];

  const user = await prisma.user.findUnique({
    where: { email: MOCK_USER_EMAIL }
  });

  if (!user) throw new Error("Unauthorized");

  await prisma.task.create({
    data: {
      title,
      description,
      eventId: eventId || null,
      deadline: deadline ? new Date(deadline) : null,
      priority: priority || "medium",
      createdBy: user.id,
      assignees: {
        create: assigneeIds.map(id => ({
          userId: id,
          role: "MEMBER"
        }))
      }
    }
  });

  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}

export async function getTasks(searchParams?: { sort?: string; filter?: string; eventId?: string }) {
  const where: any = {};
  
  if (searchParams?.filter && searchParams.filter !== "all") {
    where.status = searchParams.filter;
  }
  
  if (searchParams?.eventId) {
    where.eventId = searchParams.eventId;
  }

  const orderBy: any = {};
  if (searchParams?.sort === "deadline") {
    orderBy.deadline = "asc";
  } else if (searchParams?.sort === "priority") {
    orderBy.priority = "desc";
  } else {
    orderBy.createdAt = "desc";
  }

  return await prisma.task.findMany({
    where,
    orderBy,
    include: {
      assignees: {
        include: {
          user: true
        }
      },
      event: true,
      creator: true
    }
  });
}

export async function updateTaskStatus(taskId: string, status: string) {
  await prisma.task.update({
    where: { id: taskId },
    data: { status }
  });
  revalidatePath("/tasks");
  revalidatePath("/dashboard");
}

export async function updateTaskAssigneeRole(assignmentId: string, role: string) {
  await prisma.taskAssignment.update({
    where: { id: assignmentId },
    data: { role }
  });
  revalidatePath("/tasks");
}

export async function removeTaskAssignee(assignmentId: string) {
  await prisma.taskAssignment.delete({
    where: { id: assignmentId }
  });
  revalidatePath("/tasks");
}

export async function deleteTask(taskId: string) {
  await prisma.taskAssignment.deleteMany({ where: { taskId } });
  await prisma.task.delete({ where: { id: taskId } });
  revalidatePath("/tasks");
}
