/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Trials` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Trials_clientId_key" ON "Trials"("clientId");
