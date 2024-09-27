/*
  Warnings:

  - You are about to drop the column `image` on the `story` table. All the data in the column will be lost.
  - Added the required column `img` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `story` DROP COLUMN `image`,
    ADD COLUMN `img` VARCHAR(191) NOT NULL;
