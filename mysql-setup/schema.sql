-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`PLAYERS`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`PLAYERS` ;

CREATE TABLE IF NOT EXISTS `mydb`.`PLAYERS` (
  `UUID` VARCHAR(36) NOT NULL,
  `NAME` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`UUID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`GAME`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`GAME` ;

CREATE TABLE IF NOT EXISTS `mydb`.`GAME` (
  `UUID` VARCHAR(36) NOT NULL,
  `NAME` VARCHAR(45) NULL,
  `PLAYER1_UUID` VARCHAR(36) NOT NULL,
  `PLAYER2_UUID` VARCHAR(36) NOT NULL,
  PRIMARY KEY (`UUID`),
  INDEX `fk_GAME_PLAYERS1_idx` (`PLAYER1_UUID` ASC) VISIBLE,
  INDEX `fk_GAME_PLAYERS2_idx` (`PLAYER2_UUID` ASC) VISIBLE,
  CONSTRAINT `fk_GAME_PLAYERS1`
    FOREIGN KEY (`PLAYER1_UUID`)
    REFERENCES `mydb`.`PLAYERS` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GAME_PLAYERS2`
    FOREIGN KEY (`PLAYER2_UUID`)
    REFERENCES `mydb`.`PLAYERS` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`TURN`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`TURN` ;

CREATE TABLE IF NOT EXISTS `mydb`.`TURN` (
  `UUID` VARCHAR(36) NOT NULL,
  `GAME_UUID` VARCHAR(36) NOT NULL,
  `TURN_NUM` INT NOT NULL,
  INDEX `fk_TURN_GAME1_idx` (`GAME_UUID` ASC) VISIBLE,
  PRIMARY KEY (`UUID`),
  CONSTRAINT `fk_TURN_GAME1`
    FOREIGN KEY (`GAME_UUID`)
    REFERENCES `mydb`.`GAME` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`MOVE`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`MOVE` ;

CREATE TABLE IF NOT EXISTS `mydb`.`MOVE` (
  `TURN_UUID` VARCHAR(36) NOT NULL,
  `MOVE_NUM` INT NOT NULL,
  `FROM_POS` INT NOT NULL,
  `TO_POS` INT NOT NULL,
  `CARD_NUM` INT NOT NULL,
  INDEX `fk_MOVE_TURN1_idx` (`TURN_UUID` ASC) VISIBLE,
  CONSTRAINT `fk_MOVE_TURN1`
    FOREIGN KEY (`TURN_UUID`)
    REFERENCES `mydb`.`TURN` (`UUID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
