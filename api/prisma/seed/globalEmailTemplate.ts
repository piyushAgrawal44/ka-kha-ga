import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export async function seedGlobalEmailTemplate(prisma: PrismaClient) {
  console.log("➡ Seeding GlobalEmailTemplate...");

  const filePath = join(__dirname, ".", "data", "globalEmailTemplates.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  await prisma.globalEmailTemplate.createMany({
    data,
    skipDuplicates: true,
  });

  console.log("✔ GlobalEmailTemplate seeded.");
}
