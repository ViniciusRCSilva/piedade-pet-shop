-- CreateEnum
CREATE TYPE "ProductAnimalCategory" AS ENUM ('DOG', 'CAT', 'DOG_AND_CAT', 'OTHER');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "animal" "ProductAnimalCategory" NOT NULL DEFAULT 'OTHER';
