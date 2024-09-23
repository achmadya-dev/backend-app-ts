/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` ADD COLUMN `poster` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(191) NOT NULL;
