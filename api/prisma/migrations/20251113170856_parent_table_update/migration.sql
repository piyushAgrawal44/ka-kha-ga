/*
  Warnings:

  - You are about to drop the column `schoolName` on the `parent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `parent` DROP COLUMN `schoolName`,
    ADD COLUMN `name` VARCHAR(150) NULL;
