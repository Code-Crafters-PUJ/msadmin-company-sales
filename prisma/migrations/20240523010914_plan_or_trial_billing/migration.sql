/*
  Warnings:

  - You are about to drop the column `numServices` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Trials` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_planId_fkey";

-- DropForeignKey
ALTER TABLE "Trials" DROP CONSTRAINT "Trials_clientId_fkey";

-- DropIndex
DROP INDEX "Trials_clientId_key";

-- AlterTable
ALTER TABLE "Billing" ADD COLUMN     "trialId" INTEGER,
ALTER COLUMN "planId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "numServices";

-- AlterTable
ALTER TABLE "Trials" DROP COLUMN "clientId";

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_trialId_fkey" FOREIGN KEY ("trialId") REFERENCES "Trials"("id") ON DELETE SET NULL ON UPDATE CASCADE;
