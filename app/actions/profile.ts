"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const MOCK_USER_EMAIL = "root@leads.msruas.ac.in";

export async function getProfile() {
  return await prisma.user.findUnique({
    where: { email: MOCK_USER_EMAIL },
    include: { 
      committees: true,
      eventAssignments: {
        include: {
          event: true
        }
      },
      assignedTasks: {
        include: {
          event: true
        }
      }
    }
  });
}

export async function updateProfile(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const designation = formData.get("designation") as string;
  const profilePicture = formData.get("profilePicture") as string;

  await prisma.user.update({
    where: { email: MOCK_USER_EMAIL },
    data: {
      fullName,
      designation,
      profilePicture: profilePicture || null,
    }
  });

  revalidatePath("/profile");
  revalidatePath("/dashboard");
  revalidatePath("/committees");
  revalidatePath("/members");
}
