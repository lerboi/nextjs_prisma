/*
  Warnings:

  - You are about to alter the column `bookTime` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `booking` MODIFY `bookTime` JSON NOT NULL;
