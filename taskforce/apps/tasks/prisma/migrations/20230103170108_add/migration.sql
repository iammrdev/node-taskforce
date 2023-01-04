/*
  Warnings:

  - You are about to drop the column `comments` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "comments";

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
