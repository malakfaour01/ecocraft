-- CreateTable
CREATE TABLE "RecyclingCenter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "acceptedMaterials" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecyclingCenter_pkey" PRIMARY KEY ("id")
);
