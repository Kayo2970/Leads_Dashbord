import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  const photosDir = path.join(process.cwd(), "public", "team-photos");
  const files = fs.readdirSync(photosDir);

  console.log(`Found ${files.length} files in team-photos directory.`);

  const users = await prisma.user.findMany();
  console.log(`Checking ${users.length} users...`);

  let updatedCount = 0;

  for (const file of files) {
    if (!file.endsWith(".webp")) continue;

    const nameSlug = file.replace(".webp", "").toLowerCase();
    
    const cleanName = (name: string) => {
      return name.toLowerCase()
        .replace(/^(mr\.|ms\.|mrs\.|dr\.|prof\.)\s+/g, "")
        .replace(/\s+/g, "-")
        .replace(/[^a-z-]/g, "");
    };

    // Find a user whose name matches this slug
    const user = users.find(u => {
      const uSlug = cleanName(u.fullName);
      const uParts = uSlug.split("-").filter(p => p.length > 2);
      const sParts = nameSlug.split("-").filter(p => p.length > 2);
      
      const matchAllU = uParts.every(p => nameSlug.includes(p));
      const matchAllS = sParts.every(p => uSlug.includes(p));
      
      return uSlug === nameSlug || matchAllU || matchAllS;
    });

    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { profilePicture: `/team-photos/${file}` }
      });
      console.log(`Updated photo for: ${user.fullName}`);
      updatedCount++;
    } else {
      // Try partial match if slug didn't work (e.g. if middle names are missing)
      const partialUser = users.find(u => {
        const uSlug = u.fullName.toLowerCase().replace(/\s+/g, "-");
        return uSlug.includes(nameSlug) || nameSlug.includes(uSlug);
      });

      if (partialUser && !partialUser.profilePicture) {
          await prisma.user.update({
            where: { id: partialUser.id },
            data: { profilePicture: `/team-photos/${file}` }
          });
          console.log(`Updated photo (partial match) for: ${partialUser.fullName}`);
          updatedCount++;
      }
    }
  }

  console.log(`Successfully updated ${updatedCount} user profile pictures.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
