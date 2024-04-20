/*
  Warnings:

  - You are about to drop the column `accounts` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `users` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "accounts",
ADD COLUMN     "users" INTEGER NOT NULL;
