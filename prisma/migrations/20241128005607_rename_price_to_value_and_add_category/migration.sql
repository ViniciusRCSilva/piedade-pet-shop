/*
  Warnings:

  - You are about to drop the column `price` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `category` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "price",
ADD COLUMN     "category" "ProductCategory" NOT NULL,
ADD COLUMN     "value" DECIMAL(10,2) NOT NULL;
