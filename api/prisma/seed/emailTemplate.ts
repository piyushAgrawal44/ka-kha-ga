import { PrismaClient, TemplateType } from "@prisma/client";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function seedEmailTemplate(prisma: PrismaClient) {
  console.log("➡ Seeding EmailTemplate...");

  const filePath = join(__dirname, ".", "data", "emailTemplates.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const normalizedData = data.map((item: any) => ({
    ...item,
    templateType: item.templateType as TemplateType,
  }));

  await prisma.emailTemplate.createMany({
    data: normalizedData,
    skipDuplicates: true,
  });

  console.log("✔ EmailTemplate seeded.");
}