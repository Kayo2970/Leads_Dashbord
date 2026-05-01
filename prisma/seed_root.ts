import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const rootEmail = "root@leads.msruas.ac.in";
  const rootPassword = "RootSecurePassword123!"; // This is the hidden root password
  const hashedPassword = await bcrypt.hash(rootPassword, 12);

  // Clear all data as requested
  console.log("Cleaning database...");
  await prisma.rating.deleteMany();
  await prisma.task.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.contribution.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();
  await prisma.committee.deleteMany();
  await prisma.groupPolicy.deleteMany();

  console.log("Initializing root user and global policies...");
  
  await prisma.user.create({
    data: {
      email: rootEmail,
      fullName: "System Root",
      password: hashedPassword,
      role: "super_admin",
      isAdmin: true,
      designation: "System Administrator"
    }
  });

  await prisma.groupPolicy.create({
    data: {
      id: "global",
      menuConfig: JSON.stringify({
        super_admin: ["Dashboard", "Events", "Tasks", "Ratings", "Members", "Committees", "Reports", "Announcements"],
        faculty_admin: ["Dashboard", "Events", "Tasks", "Ratings", "Members", "Committees", "Reports", "Announcements"],
        student_member: ["Dashboard", "Events", "Tasks", "Announcements"]
      })
    }
  });

  console.log("Root initialization complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
