"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// For demonstration, we'll mock the active user as the Professor
// In a real app with next-auth or supabase, you'd get the session here.
const MOCK_PROFESSOR_EMAIL = "professor@msruas.ac.in";

export async function createEvent(formData: FormData) {
  const name = formData.get("name") as string;
  const dateStr = formData.get("date") as string;
  const time = formData.get("time") as string;
  const venue = formData.get("venue") as string;
  const description = formData.get("description") as string;

  const professor = await prisma.user.findUnique({
    where: { email: MOCK_PROFESSOR_EMAIL }
  });

  if (!professor) throw new Error("Professor user not found");

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
      tasks: true
    }
  });
}
