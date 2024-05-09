/*
  Warnings:

  - You are about to drop the column `duration` on the `Plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[type]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Plan_type_duration_key";

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "duration";

-- CreateIndex
CREATE UNIQUE INDEX "Plan_type_key" ON "Plan"("type");
