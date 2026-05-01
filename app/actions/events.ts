"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const MOCK_PROFESSOR_EMAIL = "root@leads.msruas.ac.in";

export async function createEvent(formData: FormData) {
  const name = formData.get("name") as string;
  const dateStr = formData.get("date") as string;
  const time = formData.get("time") as string;
  const venue = formData.get("venue") as string;
  const description = formData.get("description") as string;

  const professor = await prisma.user.findUnique({
    where: { email: MOCK_PROFESSOR_EMAIL }
  });

  if (!professor) throw new Error("Admin user not found");

  await prisma.event.create({
    data: {
      name,
      date: new Date(dateStr),
      time,
      venue,
      description,
      createdBy: professor.id
    }
  });

  revalidatePath("/events");
  revalidatePath("/dashboard");
}

export async function getEvents() {
  return await prisma.event.findMany({
    orderBy: { date: "desc" },
    include: {
      creator: true,
      tasks: {
        include: {
          assignee: true
        }
      },
      teamAssignments: {
        include: {
          user: true
        }
      }
    }
  });
}

export async function assignTeamToEvent(formData: FormData) {
  const eventId = formData.get("eventId") as string;
  const userId = formData.get("userId") as string;
  const designation = formData.get("designation") as string;

  await prisma.eventAssignment.upsert({
    where: {
      eventId_userId: {
        eventId,
        userId
      }
    },
    update: {
      designation
    },
    create: {
      eventId,
      userId,
      designation
    }
  });

  revalidatePath("/events");
}

export async function removeFromEventTeam(eventId: string, userId: string) {
  await prisma.eventAssignment.delete({
    where: {
      eventId_userId: {
        eventId,
        userId
      }
    }
  });

  revalidatePath("/events");
}
