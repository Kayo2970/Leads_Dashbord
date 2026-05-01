"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getMembers(searchParams?: { sort?: string; filter?: string }) {
  const where: any = {};
  
  if (searchParams?.filter && searchParams.filter !== "all") {
    where.role = searchParams.filter;
  }

  const orderBy: any = {};
  if (searchParams?.sort === "name_desc") {
    orderBy.fullName = "desc";
  } else if (searchParams?.sort === "role") {
    orderBy.role = "asc";
  } else {
    orderBy.fullName = "asc";
  }

  return await prisma.user.findMany({
    where,
    orderBy,
    include: {
      committees: true
    }
  });
}

export async function createMember(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const role = formData.get("role") as string;
  const designation = formData.get("designation") as string;
  const committeeId = formData.get("committeeId") as string;

  await prisma.user.create({
    data: {
      fullName,
      email,
      role,
      designation,
      committees: committeeId ? {
        connect: { id: committeeId }
      } : undefined
    }
  });

  revalidatePath("/members");
}

export async function updateMember(userId: string, formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const role = formData.get("role") as string;
  const designation = formData.get("designation") as string;
  const email = formData.get("email") as string;

  await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
      role,
      designation,
      email
    }
  });

  revalidatePath("/members");
  revalidatePath("/dashboard");
}
export async function getMemberProfile(userId: string) {
  return await prisma.user.findUnique({
    where: { id: userId },
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
        },
        orderBy: {
          deadline: "asc"
        }
      }
    }
  });
}
