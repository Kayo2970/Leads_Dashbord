import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teamData = {
  executiveCouncil: [
    { name: 'Prof. Kuldeep Kumar Raina', role: 'PATRON', email: 'kuldeep.raina@msruas.ac.in', image: '/team-photos/kuldeep-raina.webp' },
    { name: 'Dr. K. M. Sharath Kumar', role: 'CHIEF ADVISER', email: 'sharath.kumar@msruas.ac.in', image: '/team-photos/sharath-kumar.webp' },
    { name: 'Dr. Subhadeep Mukherjee', role: 'CENTRE HEAD', email: 'professor@msruas.ac.in', image: '/team-photos/subhadeep-mukherjee.webp' },
    { name: 'Mr. Ajay R', role: 'FINANCE HEAD', email: 'ajay.r@msruas.ac.in', image: '/team-photos/ajay-r.webp' },
    { name: 'Dr. Kiran Kumar B M', role: 'HEAD EVENT COORDINATION', email: 'kiran.kumar@msruas.ac.in', image: '/team-photos/kiran-kumar.webp' },
    { name: 'Dr. Pallabi Mund', role: 'HEAD EVENT COORDINATION', email: 'pallabi.mund@msruas.ac.in', image: '/team-photos/pallabi-mund.webp' },
    { name: 'Ms. Sujata Bijwe', role: 'HEAD INDUSTRY CONNECT', email: 'sujata.bijwe@msruas.ac.in', image: '/team-photos/sujata-bijwe.webp' },
  ],
  seniors: [
    { name: 'Mr. Gurutejas C', role: 'SR. PRESIDENT', email: 'gurutejas@msruas.ac.in', image: '/team-photos/gurutejas-c.webp' },
    { name: 'Mr. Abhijit Arya', role: 'SR. VICE PRESIDENT', email: 'abhijit@msruas.ac.in', image: '/team-photos/abhijit-arya.webp' },
    { name: 'Mr. Laksh Soorya Singh', role: 'SR. EVENTS & OPERATIONS HEAD', email: 'laksh@msruas.ac.in', image: '/team-photos/laksh-soorya-singh.webp' },
    { name: 'Mr. Bhawen Maroo', role: 'SR. EVENTS & OPERATIONS HEAD', email: 'bhawen@msruas.ac.in', image: '/team-photos/bhawen-maroo.webp' },
    { name: 'Ms. Shreesha S.N', role: 'SR. SOCIAL MEDIA & DESIGN HEAD', email: 'shreesha@msruas.ac.in', image: '/team-photos/shreesha-sn.webp' },
    { name: 'Ms. Bharvi A Padia', role: 'SR. PR HEAD', email: 'bharvi@msruas.ac.in', image: '/team-photos/bharvi-padia.webp' },
    { name: 'Mr. Arvind Rakshith G', role: 'SR. FINANCE & SPONSORSHIP HEAD', email: 'arvind.g@msruas.ac.in', image: '/team-photos/arvind-rakshith.webp' },
  ],
  organizers: [
    { name: 'Nuthan H', role: 'PRESIDENT', committee: 'Management', email: 'nuthan@msruas.ac.in', image: '/team-photos/nuthan-h.webp' },
    { name: 'Kunal Bhadauria', role: 'VICE PRESIDENT', committee: 'Management', email: 'kunal@msruas.ac.in', image: '/team-photos/kunal-bhadauria.webp' },
    { name: 'Sudev Mitra', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'sudev@msruas.ac.in', image: '/team-photos/sudev-mitra.webp' },
    { name: 'Jyotsna Karn', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'jyotsna@msruas.ac.in', image: '/team-photos/jyotsna-karn.webp' },
    { name: 'Pranav P J', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'pranav@msruas.ac.in', image: '/team-photos/pranav-pj.webp' },
    { name: 'Shravya T', role: 'CHIEF COORDINATOR', committee: 'Coordination', email: 'shravya@msruas.ac.in', image: '/team-photos/shravya-t.webp' },
    { name: 'Shriram SG', role: 'GENERAL SECRETARY', committee: 'Administration', email: 'shriram@msruas.ac.in', image: '/team-photos/shriram-sg.webp' },
    { name: 'S Bhavya Shree', role: 'GENERAL SECRETARY', committee: 'Administration', email: 'bhavya@msruas.ac.in', image: '/team-photos/bhavya-shree.webp' },
    { name: 'Manoj Petakamsetty', role: 'GENERAL SECRETARY', committee: 'Administration', email: 'manoj@msruas.ac.in', image: '/team-photos/manoj-petakamsetty.webp' },
    { name: 'Yash Chandak', role: 'HEAD-OPERATIONS AND LOGISTICS', committee: 'Operations and Logistics', email: 'yash@msruas.ac.in', image: '/team-photos/yash-chandak.webp' },
    { name: 'Kayomarz Pavri', role: 'HEAD-DESIGN AND SOCIAL MEDIA', committee: 'Design and Social Media', email: 'kayomarz@msruas.ac.in', image: '/team-photos/kayomarz-pavri.webp' },
    { name: 'Shwetha S', role: 'HEAD-DESIGN AND SOCIAL MEDIA', committee: 'Design and Social Media', email: 'shwetha@msruas.ac.in', image: '/team-photos/shwetha-s.webp' },
    { name: 'Niyati Chawra', role: 'HEAD-LEADERSHIP AND DEVELOPMENT', committee: 'Leadership and Development', email: 'niyati@msruas.ac.in', image: '/team-photos/niyati-chawra.webp' },
    { name: 'Sadiya Sawood', role: 'HEAD-LEADERSHIP AND DEVELOPMENT', committee: 'Leadership and Development', email: 'sadiya@msruas.ac.in', image: '/team-photos/sadiya-sawood.webp' },
    { name: 'Nimisha K M', role: 'HEAD-SUSTAINABILITY AND INNOVATION', committee: 'Sustainability and Innovation', email: 'nimisha@msruas.ac.in', image: '/team-photos/nimisha-km.webp' },
    { name: 'Kishan KP', role: 'HEAD-MARKETING AND BRANDING', committee: 'Marketing and Branding', email: 'kishan@msruas.ac.in', image: '/team-photos/kishan-kp.webp' },
    { name: 'Aravind Manashetti', role: 'HEAD-FINANCE AND SPONSORSHIP', committee: 'Finance and Sponsorship', email: 'arvind.m@msruas.ac.in', image: '/team-photos/arvind-manashetti.webp' },
    { name: 'Mr. Syed Furqaan Ahmed', role: 'HEAD-RESEARCH & DEVELOPMENT', committee: 'Research and Development', email: 'syed@msruas.ac.in', image: '/team-photos/syed-furqaan.webp' },
  ]
};

async function main() {
  console.log("Starting team sync with photos...");

  // 1. Ensure Committees exist
  const committees = [
    "Management", "Coordination", "Administration", "Operations and Logistics",
    "Design and Social Media", "Leadership and Development", "Sustainability and Innovation",
    "Marketing and Branding", "Finance and Sponsorship", "Research and Development"
  ];

  for (const name of committees) {
    await prisma.committee.upsert({
      where: { id: name },
      update: {},
      create: { id: name, name, description: `${name} Committee` }
    });
  }

  // 2. Insert Executive Council
  for (const person of teamData.executiveCouncil) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { fullName: person.name, role: 'super_admin', designation: person.role, profilePicture: person.image },
      create: { email: person.email, fullName: person.name, role: 'super_admin', designation: person.role, profilePicture: person.image }
    });
  }

  // 3. Insert Seniors
  for (const person of teamData.seniors) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { fullName: person.name, role: 'faculty_admin', designation: person.role, profilePicture: person.image },
      create: { email: person.email, fullName: person.name, role: 'faculty_admin', designation: person.role, profilePicture: person.image }
    });
  }

  // 4. Insert Organizers
  for (const person of teamData.organizers) {
    await prisma.user.upsert({
      where: { email: person.email },
      update: { 
        fullName: person.name, 
        role: 'student_member', 
        designation: person.role,
        committeeId: person.committee,
        profilePicture: person.image
      },
      create: { 
        email: person.email, 
        fullName: person.name, 
        role: 'student_member', 
        designation: person.role,
        committeeId: person.committee,
        profilePicture: person.image
      }
    });
  }

  console.log("Team sync with photos completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
