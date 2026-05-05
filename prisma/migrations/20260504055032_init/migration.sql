-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicSubject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` ENUM('GRADE_9', 'GRADE_10', 'GRADE_11', 'GRADE_12', 'AP') NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NULL,
    `importanceLevel` INTEGER NOT NULL DEFAULT 3,
    `targetScore` VARCHAR(191) NULL,
    `actualScore` VARCHAR(191) NULL,
    `studyMode` VARCHAR(191) NULL,
    `teacher` VARCHAR(191) NULL,
    `mentor` VARCHAR(191) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `notes` TEXT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TestingItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `targetScore` VARCHAR(191) NULL,
    `actualScore` VARCHAR(191) NULL,
    `plannedDate` DATETIME(3) NULL,
    `actualDate` DATETIME(3) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NULL,
    `impact` TEXT NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Award` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `result` VARCHAR(191) NULL,
    `plannedDate` DATETIME(3) NULL,
    `actualDate` DATETIME(3) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Book` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `mentor` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `outcome` TEXT NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Research` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `mentor` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `output` TEXT NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChessTournament` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `result` VARCHAR(191) NULL,
    `eloChange` INTEGER NULL,
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NULL,
    `category` ENUM('ACADEMIC', 'TESTING', 'ACTIVITY', 'AWARD', 'BOOK', 'PROJECT', 'RESEARCH', 'CHESS', 'GENERAL') NOT NULL DEFAULT 'GENERAL',
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') NOT NULL DEFAULT 'MEDIUM',
    `status` ENUM('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'PAUSED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `startDate` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `academicSubjectId` INTEGER NULL,
    `testingItemId` INTEGER NULL,
    `activityId` INTEGER NULL,
    `awardId` INTEGER NULL,
    `bookId` INTEGER NULL,
    `projectId` INTEGER NULL,
    `researchId` INTEGER NULL,
    `chessTournamentId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_academicSubjectId_fkey` FOREIGN KEY (`academicSubjectId`) REFERENCES `AcademicSubject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_testingItemId_fkey` FOREIGN KEY (`testingItemId`) REFERENCES `TestingItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_awardId_fkey` FOREIGN KEY (`awardId`) REFERENCES `Award`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `Book`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_researchId_fkey` FOREIGN KEY (`researchId`) REFERENCES `Research`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_chessTournamentId_fkey` FOREIGN KEY (`chessTournamentId`) REFERENCES `ChessTournament`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
