import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const traineeData = [
  // Leadership Development
  { name: 'Pujan Khatri', dept: 'SSS', division: 'Leadership and Development' },
  { name: 'Sasanth Akula', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Kavinayazh S', dept: 'SSS', division: 'Leadership and Development' },
  { name: 'Mohammed Ibrahim', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Jagannadh R Krishna', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Siddhartha Kumar Mohapatra', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Vidya Pattar', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Spandana D S', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Chandrakanth Y D', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'H Varsha', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Varmitha V S', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Sameeksha SR', dept: 'FMC', division: 'Leadership and Development' },
  { name: 'Kiranmayi Dabir', dept: 'FMC', division: 'Leadership and Development' },
  
  // Sustainability & Innovation
  { name: 'Anjali', dept: 'FLAHS', division: 'Sustainability and Innovation' },
  { name: 'Surabhi', dept: 'FLAHS', division: 'Sustainability and Innovation' },
  { name: 'Suahana Khan', dept: 'SOL', division: 'Sustainability and Innovation' },
  { name: 'Khusbu R', dept: 'SOL', division: 'Sustainability and Innovation' },
  { name: 'Venkatesha K A', dept: 'FMC', division: 'Sustainability and Innovation' },
  { name: 'Aakash D', dept: 'FMC', division: 'Sustainability and Innovation' },
  { name: 'Almas Aira', dept: 'FLAHS', division: 'Sustainability and Innovation' },
  { name: 'Swagata Das', dept: 'FMC', division: 'Sustainability and Innovation' },
  
  // Marketing & Branding
  { name: 'Pruthvi Arya Singh R', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Tanushri Ajit Kumar', dept: 'SSS', division: 'Marketing and Branding' },
  { name: 'Sanjeev Monnappa', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Siya', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Abdul Samad', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Yashmith Kakde', dept: 'SSS', division: 'Marketing and Branding' },
  { name: 'Nistal Niyol Dsouza', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Sanjana Tungal', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Sweta Kumari', dept: 'FMC', division: 'Marketing and Branding' },
  { name: 'Bhumi Agarwal', dept: 'FMC', division: 'Marketing and Branding' },

  // Design-Media and PR
  { name: 'Shreyas M', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Prathna Tamang', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Jagannadh Krishna', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Sarah Akram Shiekh', dept: 'FLAHS', division: 'Design and Social Media' },
  { name: 'Tanay P Rajesh', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Bhuvan S', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Punithkumara MJ', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Hithaishini K R', dept: 'FLAHS', division: 'Design and Social Media' },
  { name: 'Lakshmi Rajput', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Shiwangi Mishra', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Rajanandani', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'Nidhi S', dept: 'FLAHS', division: 'Design and Social Media' },
  { name: 'Christina Buragohain', dept: 'FMC', division: 'Design and Social Media' },
  { name: 'K Mercy Shyamala', dept: 'FMC', division: 'Design and Social Media' },

  // Finance & Sponsorship
  { name: 'Rishidev Singha', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Mokshith Nivarthi VG', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Karan S', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Mohammed Umar Khan', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Devender Rao', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Prajwal N B', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Bheeru Arju Gadde', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Devika hegde', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Punith Kumar G L', dept: 'FMC', division: 'Finance and Sponsorship' },
  { name: 'Anush A Devadiga', dept: 'FMC', division: 'Finance and Sponsorship' },

  // Operations & Logistics
  { name: 'Vivek D R', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Devanshi Sahoo', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Deeksha Gowda M R', dept: 'FLAHS', division: 'Operations and Logistics' },
  { name: 'Harshavardhan S M', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Muhammed Mustaqim', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Arvind Reddy', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Abdulazeem Shirahatti', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Rohini H R', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Chetan R B', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Gowrav K', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Teja Shree', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Varun R', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Vishwa S Rawal', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Md Adil Attar', dept: 'FMC', division: 'Operations and Logistics' },
  { name: 'Vishakha Yadav', dept: 'FMC', division: 'Operations and Logistics' },

  // Research and Development
  { name: 'Archana S Nair', dept: 'FMC', division: 'Research and Development' },

  // Faculty Ambassadors (Dedicated Committee)
  { name: 'Aryaman Sisodia', dept: 'AAE', division: 'Faculty Ambassadors' },
  { name: 'Vaishnavi Yadav', dept: 'CSE', division: 'Faculty Ambassadors' },
  { name: 'Ridhviraj Anil Rikke', dept: 'AAE', division: 'Faculty Ambassadors' },
  { name: 'Shodhan Bekal', dept: 'FMHCET', division: 'Faculty Ambassadors' },
  { name: 'S. Akhila', dept: 'FLAHS', division: 'Faculty Ambassadors' },
  { name: 'Sufiya Simin Shiekh', dept: 'SSS', division: 'Faculty Ambassadors' },
  { name: 'Abdul Aziz', dept: 'FPH', division: 'Faculty Ambassadors' },
];

async function main() {
  console.log("Syncing Trainee Associates from PDF...");
  const defaultPassword = await bcrypt.hash("password123", 12);

  // Ensure all divisions exist as committees
  const uniqueDivisions = [...new Set(traineeData.map(t => t.division))];
  for (const div of uniqueDivisions) {
    await prisma.committee.upsert({
      where: { id: div },
      update: {},
      create: { id: div, name: div, description: `${div} Committee` }
    });
  }

  for (const trainee of traineeData) {
    const email = `${trainee.name.toLowerCase().replace(/\s+/g, '.')}@msruas.ac.in`;
    
    await prisma.user.upsert({
      where: { email },
      update: {
        fullName: trainee.name,
        role: 'student_member',
        designation: `Trainee Associate (${trainee.dept})`,
        committees: {
          set: [{ id: trainee.division }]
        }
      },
      create: {
        email,
        fullName: trainee.name,
        role: 'student_member',
        designation: `Trainee Associate (${trainee.dept})`,
        password: defaultPassword,
        committees: {
          connect: { id: trainee.division }
        }
      }
    });
  }

  console.log(`Successfully synced ${traineeData.length} Trainee Associates!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
