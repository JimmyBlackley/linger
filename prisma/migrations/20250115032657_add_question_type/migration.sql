/*
  Warnings:

  - Added the required column `type` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('MULTIPLE_CHOICE', 'TEXT_INPUT', 'SLIDER', 'DRAG_AND_DROP');

-- AlterTable
ALTER TABLE "Answer" ADD COLUMN     "value" DOUBLE PRECISION,
ALTER COLUMN "text" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "type" "QuestionType" NOT NULL;
