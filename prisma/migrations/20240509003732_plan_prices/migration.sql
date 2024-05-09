/*
  Warnings:

  - You are about to drop the column `price` on the `Plan` table. All the data in the column will be lost.
  - Added the required column `anualPrice` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensualPrice` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `semestralPrice` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "price",
ADD COLUMN     "anualPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "mensualPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "semestralPrice" DOUBLE PRECISION NOT NULL;
