-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema fitness_tracking_schema
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema fitness_tracking_schema
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fitness_tracking_schema` DEFAULT CHARACTER SET latin1 ;
USE `fitness_tracking_schema` ;

-- -----------------------------------------------------
-- Table `fitness_tracking_schema`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_tracking_schema`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `height` INT NULL,
  `weight` DECIMAL(5,2) NULL,
  `age` INT NULL,
  `calories` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `fitness_tracking_schema`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_tracking_schema`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `carbs` DECIMAL(5,2) NULL,
  `fats` INT NULL,
  `proteins` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitness_tracking_schema`.`muscle_groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_tracking_schema`.`muscle_groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitness_tracking_schema`.`exercises`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_tracking_schema`.`exercises` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  `muscle_groups_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `fk_exercises_muscle_groups_idx` (`muscle_groups_id` ASC) VISIBLE,
  CONSTRAINT `fk_exercises_muscle_groups`
    FOREIGN KEY (`muscle_groups_id`)
    REFERENCES `fitness_tracking_schema`.`muscle_groups` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitness_tracking_schema`.`user_takes_product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_tracking_schema`.`user_takes_product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `grams` INT NULL,
  `users_id` INT(11) NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `products_id`),
  INDEX `fk_user_takes_product_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_user_takes_product_products1_idx` (`products_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_takes_product_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `fitness_tracking_schema`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_takes_product_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `fitness_tracking_schema`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitness_tracking_schema`.`user_perfmors_exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `fitness_tracking_schema`.`user_perfmors_exercise` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NULL,
  `series` INT NULL,
  `repetitions` INT NULL,
  `weight` DECIMAL(5,2) NULL,
  `users_id` INT(11) NOT NULL,
  `exercises_id` INT NOT NULL,
  PRIMARY KEY (`id`, `users_id`, `exercises_id`),
  INDEX `fk_user_perfmors_exercise_users1_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_user_perfmors_exercise_exercises1_idx` (`exercises_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_perfmors_exercise_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `fitness_tracking_schema`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_perfmors_exercise_exercises1`
    FOREIGN KEY (`exercises_id`)
    REFERENCES `fitness_tracking_schema`.`exercises` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
