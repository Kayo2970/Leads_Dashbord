"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getGlobalPolicy() {
  const policy = await prisma.groupPolicy.findUnique({
    where: { id: "global" }
  });

  if (!policy) {
    // Return a default if not found
    return {
      menuConfig: JSON.stringify({
        super_admin: ["Dashboard", "Events", "Tasks", "Ratings", "Members", "Committees", "Reports", "Announcements"],
        faculty_admin: ["Dashboard", "Events", "Tasks", "Ratings", "Members", "Committees", "Reports", "Announcements"],
        student_member: ["Dashboard", "Events", "Tasks", "Announcements"]
      })
    };
  }

  return policy;
}

export async function updateGlobalPolicy(menuConfig: string) {
  await prisma.groupPolicy.upsert({
    where: { id: "global" },
    update: { menuConfig },
    create: { id: "global", menuConfig }
  });

  revalidatePath("/");
  revalidatePath("/dashboard");
}
