/*
  Warnings:

  - Changed the type of `duration` on the `Coupon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `users` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "duration",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "users" INTEGER NOT NULL;
