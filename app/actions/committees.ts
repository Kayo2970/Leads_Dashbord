"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCommittees() {
  const committees = await prisma.committee.findMany({
    orderBy: { name: "asc" },
    include: {
      users: true,
      tasks: true
    }
  });

  // Sort users within each committee by hierarchy first, then name
  const rolePriority: Record<string, number> = {
    super_admin: 1,
    faculty_admin: 2,
    student_member: 3
  };

  return committees.map(committee => ({
    ...committee,
    users: committee.users.sort((a, b) => {
      const priorityA = rolePriority[a.role] || 4;
      const priorityB = rolePriority[b.role] || 4;
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.fullName.localeCompare(b.fullName);
    })
  }));
}

export async function createCommittee(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.committee.create({
    data: {
      name,
      description
    }
  });

  revalidatePath("/committees");
  revalidatePath("/members");
  revalidatePath("/tasks");
}

export async function assignMemberToCommittee(committeeId: string, userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      committees: {
        connect: { id: committeeId }
      }
    }
  });

  revalidatePath("/committees");
  revalidatePath("/members");
}

export async function removeMemberFromCommittee(committeeId: string, userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: {
      committees: {
        disconnect: { id: committeeId }
      }
    }
  });

  revalidatePath("/committees");
  revalidatePath("/members");
}
