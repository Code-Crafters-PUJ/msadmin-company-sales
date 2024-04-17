/*
  Warnings:

  - A unique constraint covering the columns `[type,duration]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Plan_type_duration_idx" ON "Plan"("type", "duration");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_type_duration_key" ON "Plan"("type", "duration");
