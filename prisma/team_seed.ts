import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teamData = {
  executiveCouncil: [
    { name: 'Prof. Kuldeep Kumar Raina', role: 'PATRON', org: 'Vice-Chancellor', email: 'kuldeep.raina@msruas.ac.in' },
    { name: 'Dr. K. M. Sharath Kumar', role: 'CHIEF ADVISER', org: 'Dean of FMC', email: 'sharath.kumar@msruas.ac.in' },
    { name: 'Dr. Subhadeep Mukherjee', role: 'CENTRE HEAD', org: 'Associate Professor', email: 'professor@msruas.ac.in' }, // Already exists, will update
    { name: 'Mr. Ajay R', role: 'FINANCE HEAD', org: 'Assistant Professor', email: 'ajay.r@msruas.ac.in' },
    { name: 'Dr. Kiran Kumar B M', role: 'HEAD EVENT COORDINATION', org: 'Associate Professor', email: 'kiran.kumar@msruas.ac.in' },
    { name: 'Dr. Pallabi Mund', role: 'HEAD EVENT COORDINATION', org: 'Associate Professor', email: 'pallabi.mund@msruas.ac.in' },
    { name: 'Ms. Sujata Bijwe', role: 'HEAD INDUSTRY CONNECT', org: 'Adjunct Faculty', email: 'sujata.bijwe@msruas.ac.in' },
  ],
  seniors: [
    { name: 'Mr. Gurutejas C', role: 'SR. PRESIDENT', email: 'gurutejas@msruas.ac.in' },
    { name: 'Mr. Abhijit Arya', role: 'SR. VICE PRESIDENT', email: 'abhijit@msruas.ac.in' },
    { name: 'Mr. Laksh Soorya Singh', role: 'SR. EVENTS & OPERATIONS HEAD', email: 'laksh@msruas.ac.in' },
    { name: 'Mr. Bhawen Maroo', role: 'SR. EVENTS & OPERATIONS HEAD', email: 'bhawen@msruas.ac.in' },
    { name: 'Ms. Shreesha S.N', role: 'SR. SOCIAL MEDIA & DESIGN HEAD', email: 'shreesha@msruas.ac.in' },
    { name: 'Ms. Bharvi A Padia', role: 'SR. PR HEAD', email: 'bharvi@msruas.ac.in' },
    { name: 'Mr. Arvind Rakshith G', role: 'SR. FINANCE & SPONSORSHIP HEAD', email: 'arvind.g@msruas.ac.in' },
  ],
  organizers: [
    { name: 'Nuthan H', role: 'PRESIDENT', committee: 'Management', email: 'nuthan@msruas.ac.in' },
    { name: 'Kunal Bhadauria', role: 'VICE PRESIDENT', committee: 'Management', email: 'kunal@msruas.ac.in' },
    { name: 'Sudev Mitra', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'sudev@msruas.ac.in' },
    { name: 'Jyotsna Karn', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'jyotsna@msruas.ac.in' },
    { name: 'Pranav P J', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'pranav@msruas.ac.in' },
    { name: 'Shravya T', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'shravya@msruas.ac.in' },
    { name: 'Shriram SG', role: 'GENERAL SECRETARY', committee: 'Administration', email: 'shriram@msruas.ac.in' },
    { name: 'S Bhavya Shree', role: 'GENERAL SECRETARY', committee: 'Administration', email: 'bhavya@msruas.ac.in' },
    { name: 'Manoj Petakamsetty', role: 'GENERAL SECRETARY', committee: 'Administration', email: 'manoj@msruas.ac.in' },
    { name: 'Yash Chandak', role: 'HEAD-OPERATIONS AND LOGISTICS', committee: 'Operations and Logistics', email: 'yash@msruas.ac.in' },
    { name: 'Kayomarz Pavri', role: 'HEAD-DESIGN AND SOCIAL MEDIA', committee: 'Design and Social Media', email: 'kayomarz@msruas.ac.in' },
    { name: 'Shwetha S', role: 'HEAD-DESIGN AND SOCIAL MEDIA', committee: 'Design and Social Media', email: 'shwetha@msruas.ac.in' },
    { name: 'Niyati Chawra', role: 'HEAD-LEADERSHIP AND DEVELOPMENT', committee: 'Leadership and Development', email: 'niyati@msruas.ac.in' },
    { name: 'Sadiya Sawood', role: 'HEAD-LEADERSHIP AND DEVELOPMENT', committee: 'Leadership and Development', email: 'sadiya@msruas.ac.in' },
    { name: 'Nimisha K M', role: 'HEAD-SUSTAINABILITY AND INNOVATION', committee: 'Sustainability and Innovation', email: 'nimisha@msruas.ac.in' },
    { name: 'Kishan KP', role: 'HEAD-MARKETING AND BRANDING', committee: 'Marketing and Branding', email: 'kishan@msruas.ac.in' },
    { name: 'Aravind Manashetti', role: 'HEAD-FINANCE AND SPONSORSHIP', committee: 'Finance and Sponsorship', email: 'arvind.m@msruas.ac.in' },
    { name: 'Mr. Syed Furqaan Ahmed', role: 'HEAD-RESEARCH & DEVELOPMENT', committee: 'Research and Development', email: 'syed@msruas.ac.in' },
  ]
};

async function main() {
  console.log("Starting team sync...");

  // 1. Ensure Committees exist
  const committees = [
    "Management", "Coordination", "Administration", "Operations and Logistics",
    "Design and Social Media", "Leadership and Development", "Sustainability and Innovation",
    "Marketing and Branding", "Finance and Sponsorship", "Research and Development"
  ];

  for (const name of committees) {
    await prisma.committee.upsert({
      where: { id: name }, // Assuming id is string name for simplicity or mapping
      update: {},
      create: { id: name, name, description: `${name} Committee` }
    });
  }

  // 2. Insert Executive Council (Super Admins / Faculty Admins)
  for (const person of teamData.executiveCouncil) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { fullName: person.name, role: 'super_admin', designation: person.role },
      create: { email: person.email, fullName: person.name, role: 'super_admin', designation: person.role }
    });
  }

  // 3. Insert Seniors (Faculty Admins / Core)
  for (const person of teamData.seniors) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { fullName: person.name, role: 'faculty_admin', designation: person.role },
      create: { email: person.email, fullName: person.name, role: 'faculty_admin', designation: person.role }
    });
  }

  // 4. Insert Organizers (Student Members / Trainees)
  for (const person of teamData.organizers) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { 
        fullName: person.name, 
        role: 'student_member', 
        designation: person.role,
        committeeId: person.committee 
      },
      create: { 
        email: person.email, 
        fullName: person.name, 
        role: 'student_member', 
        designation: person.role,
        committeeId: person.committee
      }
    });
  }

  console.log("Team sync completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
