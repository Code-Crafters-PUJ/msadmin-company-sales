/*
  Warnings:

  - You are about to drop the column `state` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "state";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "state";
