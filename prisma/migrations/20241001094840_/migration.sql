/*
  Warnings:

  - You are about to drop the column `bookEnd` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `bookStart` on the `booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bookDate,bookTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookTime` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Booking_bookDate_bookStart_bookEnd_key` ON `booking`;

-- AlterTable
ALTER TABLE `booking` DROP COLUMN `bookEnd`,
    DROP COLUMN `bookStart`,
    ADD COLUMN `bookTime` VARCHAR(191) NOT NULL;

