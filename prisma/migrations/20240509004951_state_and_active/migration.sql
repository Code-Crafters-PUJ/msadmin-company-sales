/*
  Warnings:

  - You are about to drop the column `status` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Coupon` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Plan` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Service` table. All the data in the column will be lost.
  - Added the required column `state` to the `Billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Coupon" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "status",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "status",
ADD COLUMN     "state" TEXT NOT NULL;
