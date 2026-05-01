import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.rating.deleteMany();
  await prisma.contribution.deleteMany();
  await prisma.task.deleteMany();
  await prisma.event.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.user.deleteMany();
  await prisma.committee.deleteMany();

  // Create Committees
  const coreCommittee = await prisma.committee.create({
    data: { name: "Core Committee", description: "Main organizing body" },
  });

  const logisticsCommittee = await prisma.committee.create({
    data: { name: "Logistics", description: "Event operations and planning" },
  });

  // Create Level 1: Professor (Super Admin)
  const professor = await prisma.user.create({
    data: {
      email: "professor@msruas.ac.in",
      fullName: "Dr. Subhadeep Mukherjee",
      role: "super_admin",
    },
  });

  // Create Level 2: Core Committee
  const coreMember = await prisma.user.create({
    data: {
      email: "core@msruas.ac.in",
      fullName: "Rahul (Core Lead)",
      role: "faculty_admin",
      committeeId: coreCommittee.id,
    },
  });

  // Create Level 3: Trainee (Student Member)
  const trainee1 = await prisma.user.create({
    data: {
      email: "trainee1@msruas.ac.in",
      fullName: "Priya (Trainee)",
      role: "student_member",
      committeeId: logisticsCommittee.id,
    },
  });

  const trainee2 = await prisma.user.create({
    data: {
      email: "trainee2@msruas.ac.in",
      fullName: "Rahul (Trainee)",
      role: "student_member",
      committeeId: logisticsCommittee.id,
    },
  });

  // Create an Event
  const event = await prisma.event.create({
    data: {
      name: "Bharat Lead Summit 2026",
      date: new Date("2026-05-15T10:00:00Z"),
      description: "Annual leadership summit",
      createdBy: professor.id,
    },
  });

  // Assign Task (Core assigning to Trainee)
  await prisma.task.create({
    data: {
      title: "Book Auditorium Audio Setup",
      description: "Ensure all mics and speakers are ready for the summit.",
      eventId: event.id,
      committeeId: logisticsCommittee.id,
      assignedTo: trainee1.id,
      deadline: new Date("2026-05-14T10:00:00Z"),
      status: "in_progress",
      createdBy: coreMember.id,
    },
  });

  await prisma.task.create({
    data: {
      title: "Design Summit Banners",
      description: "Create the main stage banners.",
      eventId: event.id,
      committeeId: coreCommittee.id,
      assignedTo: trainee2.id,
      deadline: new Date("2026-05-10T10:00:00Z"),
      status: "completed",
      createdBy: professor.id,
    },
  });

  // Create Announcements
  await prisma.announcement.create({
    data: {
      title: "Welcome to the new LEADS Portal!",
      body: "We are testing the new 3-tier hierarchy system.",
      target: "all",
      createdBy: professor.id,
    },
  });

  console.log("Database seeded successfully with 3-tier structure!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
