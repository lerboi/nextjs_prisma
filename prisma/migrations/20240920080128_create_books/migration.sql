-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NOT NULL,
    `desc` VARCHAR(255) NOT NULL,
    `cover` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
