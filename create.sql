-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema hospital
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema hospital
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `hospital` DEFAULT CHARACTER SET utf8 ;
USE `hospital` ;

-- -----------------------------------------------------
-- Table `hospital`.`Medical_specialty`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Medical_specialty` (
  `M_id` VARCHAR(20) NOT NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Medical_field` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`M_id`),
  UNIQUE INDEX `Medical_field_UNIQUE` (`Medical_field` ASC) VISIBLE,
  UNIQUE INDEX `M_id_UNIQUE` (`M_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Doctor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Doctor` (
  `D_id` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NOT NULL,
  `D_M_id` VARCHAR(20) NULL,
  `Role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`D_id`),
  INDEX `fk_Doctor_Medical_specialty_idx` (`D_M_id` ASC) VISIBLE,
  UNIQUE INDEX `D_id_UNIQUE` (`D_id` ASC) VISIBLE,
  CONSTRAINT `fk_Doctor_Medical_specialty`
    FOREIGN KEY (`D_M_id`)
    REFERENCES `hospital`.`Medical_specialty` (`M_id`)
    ON DELETE CASCADE   -- Medical_specialty가 삭제되면 doctor 또한 삭제된다.
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Nurse`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Nurse` (
  `N_id` VARCHAR(20) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Address` VARCHAR(45) NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NOT NULL,
  `N_M_id` VARCHAR(20) NULL,
  `Role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`N_id`),
  INDEX `fk_Nurse_Medical_specialty1_idx` (`N_M_id` ASC) VISIBLE,
  UNIQUE INDEX `N_id_UNIQUE` (`N_id` ASC) VISIBLE,
  CONSTRAINT `fk_Nurse_Medical_specialty1`
    FOREIGN KEY (`N_M_id`)
    REFERENCES `hospital`.`Medical_specialty` (`M_id`)
    ON DELETE CASCADE   -- Medical_specialty가 삭제되면 nurse 또한 삭제된다.
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Patient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Patient` (
  `P_id` VARCHAR(20) NOT NULL,
  `SSN` VARCHAR(45) NOT NULL,
  `Name` VARCHAR(45) NOT NULL,
  `Sex` VARCHAR(45) NULL,
  `Address` VARCHAR(45) NULL,
  `Blood` VARCHAR(45) NULL,
  `Height` INT NULL,
  `Weight` INT NULL,
  `PhoneNumber` VARCHAR(45) NULL,
  `Password` VARCHAR(45) NOT NULL,
  `Role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`P_id`),
  UNIQUE INDEX `P_id_UNIQUE` (`P_id` ASC) VISIBLE,
  UNIQUE INDEX `SSN_UNIQUE` (`SSN` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Reservation` (
  `R_id` VARCHAR(20) NOT NULL,
  `Date` VARCHAR(45) NULL,
  `R_P_id` VARCHAR(20) NOT NULL,
  `R_D_id` VARCHAR(20) NOT NULL,
  `R_M_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`R_id`),
  INDEX `fk_Reservation_Patient1_idx` (`R_P_id` ASC) VISIBLE,
  INDEX `fk_Reservation_Doctor1_idx` (`R_D_id` ASC) VISIBLE,
  INDEX `fk_Reservation_Medical_specialty1_idx` (`R_M_id` ASC) VISIBLE,
  UNIQUE INDEX `R_id_UNIQUE` (`R_id` ASC) VISIBLE,
  CONSTRAINT `fk_Reservation_Patient1`
    FOREIGN KEY (`R_P_id`)
    REFERENCES `hospital`.`Patient` (`P_id`)
    ON DELETE CASCADE   -- patient가 삭제되면 reservation 또한 삭제된다.
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_Doctor1`
    FOREIGN KEY (`R_D_id`)
    REFERENCES `hospital`.`Doctor` (`D_id`)
    ON DELETE CASCADE   -- doctor가 삭제되면 reservation 또한 삭제된다.
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reservation_Medical_specialty1`
    FOREIGN KEY (`R_M_id`)
    REFERENCES `hospital`.`Medical_specialty` (`M_id`)
    ON DELETE CASCADE   -- Medical_specialty가 삭제되면 reservation 또한 삭제된다.
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Treatment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Treatment` (
  `Date` VARCHAR(45) NULL,
  `Info` VARCHAR(45) NULL,
  `T_N_id` VARCHAR(20) NOT NULL,
  `T_P_id` VARCHAR(20) NOT NULL,
  `T_id` VARCHAR(45) NOT NULL,
  INDEX `fk_Treatment_Nurse1_idx` (`T_N_id` ASC) VISIBLE,
  INDEX `fk_Treatment_Patient1_idx` (`T_P_id` ASC) VISIBLE,
  PRIMARY KEY (`T_id`),
  CONSTRAINT `fk_Treatment_Nurse1`
    FOREIGN KEY (`T_N_id`)
    REFERENCES `hospital`.`Nurse` (`N_id`)
    ON DELETE CASCADE   -- Nurse가 삭제되면 Treatment 또한 삭제된다.
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Treatment_Patient1`
    FOREIGN KEY (`T_P_id`)
    REFERENCES `hospital`.`Patient` (`P_id`)
    ON DELETE CASCADE   -- Patient가 삭제되면 Treatment 또한 삭제된다.
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Examination`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Examination` (
  `Date` VARCHAR(45) NULL,
  `Info` VARCHAR(45) NULL,
  `E_D_id` VARCHAR(20) NOT NULL,
  `E_P_id` VARCHAR(20) NOT NULL,
  `E_id` VARCHAR(45) NOT NULL,
  INDEX `fk_M_test_Doctor1_idx` (`E_D_id` ASC) VISIBLE,
  INDEX `fk_M_test_Patient1_idx` (`E_P_id` ASC) VISIBLE,
  PRIMARY KEY (`E_id`),
  CONSTRAINT `fk_M_test_Doctor1`
    FOREIGN KEY (`E_D_id`)
    REFERENCES `hospital`.`Doctor` (`D_id`)
    ON DELETE CASCADE   -- Doctor가 삭제되면 Examination 또한 삭제된다.
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_M_test_Patient1`
    FOREIGN KEY (`E_P_id`)
    REFERENCES `hospital`.`Patient` (`P_id`)
    ON DELETE CASCADE   -- Patient가 삭제되면 Examination 또한 삭제된다.
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `hospital`.`Inpatient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `hospital`.`Inpatient` (
  `I_id` VARCHAR(20) NOT NULL,
  `I_date` VARCHAR(45) NOT NULL,
  `O_date` VARCHAR(45) NULL,
  `I_P_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`I_id`, `I_P_id`),
  INDEX `fk_Inpatient_Patient1_idx` (`I_P_id` ASC) VISIBLE,
  CONSTRAINT `fk_Inpatient_Patient1`
    FOREIGN KEY (`I_P_id`)
    REFERENCES `hospital`.`Patient` (`P_id`)
    ON DELETE CASCADE   -- Patient가 삭제되면 Inpatient 또한 삭제된다.
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;