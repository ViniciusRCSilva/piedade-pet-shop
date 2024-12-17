/*
  Warnings:

  - A unique constraint covering the columns `[userId,productId]` on the table `user_favorites_products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_favorites_products_userId_productId_key" ON "user_favorites_products"("userId", "productId");
