-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               10.0.38-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Дамп структуры базы данных solid_solutions_test
CREATE DATABASE IF NOT EXISTS `solid_solutions_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `solid_solutions_test`;

-- Дамп структуры для таблица solid_solutions_test.tree_nodes
CREATE TABLE IF NOT EXISTS `tree_nodes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `parent_node_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `parent_node_id` (`parent_node_id`),
  CONSTRAINT `tree_nodes_ibfk_1` FOREIGN KEY (`parent_node_id`) REFERENCES `tree_nodes` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;

-- Экспортируемые данные не выделены.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
