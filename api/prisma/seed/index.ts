import { PrismaClient } from "@prisma/client";
import { seedGlobalEmailTemplate } from "./globalEmailTemplate";
import { seedEmailTemplate } from "./emailTemplate";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting Prisma Seeding...");

  await seedGlobalEmailTemplate(prisma);
  await seedEmailTemplate(prisma);

  console.log("🌱 All Seeds Completed!");
}

main()
  .catch((err) => console.error("❌ Seeder Error:", err))
  .finally(async () => prisma.$disconnect());
