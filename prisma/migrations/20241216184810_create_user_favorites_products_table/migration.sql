/*
  Warnings:

  - You are about to drop the `_UserFavoritesProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFavoritesProducts" DROP CONSTRAINT "_UserFavoritesProducts_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavoritesProducts" DROP CONSTRAINT "_UserFavoritesProducts_B_fkey";

-- DropTable
DROP TABLE "_UserFavoritesProducts";

-- CreateTable
CREATE TABLE "user_favorites_products" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "user_favorites_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_favorites_products" ADD CONSTRAINT "user_favorites_products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorites_products" ADD CONSTRAINT "user_favorites_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
