-- AlterTable
ALTER TABLE "User" ADD COLUMN     "interests" TEXT[],
ADD COLUMN     "onboarded" BOOLEAN NOT NULL DEFAULT false;
