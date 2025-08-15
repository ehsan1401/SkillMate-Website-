-- CreateEnum
CREATE TYPE "public"."UserType" AS ENUM ('ADMIN', 'PRO', 'NORMAL');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" "public"."UserType" NOT NULL,
    "passCode" TEXT NOT NULL,
    "profileImageUrl" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");
