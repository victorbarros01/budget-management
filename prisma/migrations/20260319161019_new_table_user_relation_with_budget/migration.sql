/*
  Warnings:

  - The primary key for the `Budget` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Budget` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `category` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Budget` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Budget` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "Budget" DROP CONSTRAINT "Budget_pkey",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ADD CONSTRAINT "Budget_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
