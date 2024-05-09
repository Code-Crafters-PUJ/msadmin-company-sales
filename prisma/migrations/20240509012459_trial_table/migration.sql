-- CreateTable
CREATE TABLE "Trials" (
    "id" SERIAL NOT NULL,
    "duration" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "planType" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trials" ADD CONSTRAINT "Trials_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trials" ADD CONSTRAINT "Trials_planType_fkey" FOREIGN KEY ("planType") REFERENCES "Plan"("type") ON DELETE RESTRICT ON UPDATE CASCADE;
