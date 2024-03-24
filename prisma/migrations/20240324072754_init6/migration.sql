-- DropForeignKey
ALTER TABLE `Ingredient` DROP FOREIGN KEY `Ingredient_mealId_fkey`;

-- AddForeignKey
ALTER TABLE `Ingredient` ADD CONSTRAINT `Ingredient_mealId_fkey` FOREIGN KEY (`mealId`) REFERENCES `Meal`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
