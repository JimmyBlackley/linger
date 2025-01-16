/*
  Warnings:

  - You are about to drop the column `correctId` on the `Question` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_correctId_fkey";

-- DropIndex
DROP INDEX "Question_correctId_key";

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "isCorrect" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "correctId";
