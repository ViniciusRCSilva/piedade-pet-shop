/*
  Warnings:

  - Added the required column `userAddress` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "userAddress" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_UserFavoritesProducts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavoritesProducts_AB_unique" ON "_UserFavoritesProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavoritesProducts_B_index" ON "_UserFavoritesProducts"("B");

-- AddForeignKey
ALTER TABLE "_UserFavoritesProducts" ADD CONSTRAINT "_UserFavoritesProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavoritesProducts" ADD CONSTRAINT "_UserFavoritesProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
