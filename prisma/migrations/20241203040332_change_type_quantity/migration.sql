/*
  Warnings:

  - You are about to alter the column `quantity` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "quantity" SET DATA TYPE DECIMAL(10,2);
