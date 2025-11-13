/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.13-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: appdb
-- ------------------------------------------------------
-- Server version	11.8.3-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `token` text NOT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES
(7,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMTkyMzc0LCJleHAiOjE3NjIyMDI0NTR9.rECS42h-GUkfqJyPP0VKmtGW1teQxehQXNI8CHH-1Fw','2025-11-10 17:52:54','2025-11-03 17:52:54'),
(8,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMTkyNDE3LCJleHAiOjE3NjIyMDI0OTd9.Ro3rhbIBenqkS4rXkbUMGZwPT8ovJAIJOtCtqNqnvwA','2025-11-10 17:53:37','2025-11-03 17:53:37'),
(9,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMTkyNTU1LCJleHAiOjE3NjIyMDI2MzV9.gxoCYYUp9TFN5P5klCIStQNel0hfEgBYjDxldh87Y74','2025-11-10 17:55:55','2025-11-03 17:55:55'),
(10,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMTkyODg4LCJleHAiOjE3NjIyMDI5Njh9.0YCX1BEhHdog3tXmoV5KvjLvvuHf4bdwdOPQms6jxLc','2025-11-10 18:01:28','2025-11-03 18:01:28'),
(11,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMTkyOTgzLCJleHAiOjE3NjIyMDMwNjN9._IPvWkbk4Xx9kymN9-5xS1cbEya67fGyKcxT87uXGJM','2025-11-10 18:03:03','2025-11-03 18:03:03'),
(12,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMTk0NzMzLCJleHAiOjE3NjIyMDQ4MTN9.arIw7rWGp2sdAef9zCmwULhj7fMNxnb-qWDkdiaT-74','2025-11-10 18:32:13','2025-11-03 18:32:13'),
(13,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMjkyNTI4LCJleHAiOjE3NjIzMDI2MDh9.Z_BTpK5xtY_5NlgC84UXJWPfVhAUDotD59YE3nuV4Uw','2025-11-11 21:42:08','2025-11-04 21:42:08'),
(14,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMjkyNTgyLCJleHAiOjE3NjIzMDI2NjJ9.vVwEviaNI1dFSQNFlA7iDKbRbdJA-0oG40ElJtiFGOk','2025-11-11 21:43:02','2025-11-04 21:43:02'),
(15,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYyMjkyNjc5LCJleHAiOjE3NjIzMDI3NTl9.j0pum9MLAwYfX6LsaTDxyMtsUKku2kqy-arrDGP_Jw0','2025-11-11 21:44:39','2025-11-04 21:44:39'),
(16,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDY3MjY2LCJleHAiOjE3NjMwNzczNDZ9.CtY0mzsbBGP90TfuHPi99jGuTlFoVPLYynLwUS_AyE0','2025-11-20 20:54:26','2025-11-13 20:54:26'),
(17,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDY5MDcyLCJleHAiOjE3NjMwNzkxNTJ9.zgTGkLXDdot9Ahf4wpjKlTQPnSf3jEwfjOtwNauM4Lo','2025-11-20 21:24:32','2025-11-13 21:24:32'),
(18,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwMTUwLCJleHAiOjE3NjMwODAyMzB9.NY3YH48mpjhB3_cZlLrfoBZCv7BElfDmU5_in62Zd2c','2025-11-20 21:42:30','2025-11-13 21:42:30'),
(19,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwMjU3LCJleHAiOjE3NjMwODAzMzd9.4e89WbaT3Lr1p4XaoTAVGfHTjDdKJOl-4nmtxdzBoKk','2025-11-20 21:44:17','2025-11-13 21:44:17'),
(20,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwMjg0LCJleHAiOjE3NjMwODAzNjR9.uvCRRwoNzGNmzak0girqg5GSEnB1y4xfnk2Gog5B7EQ','2025-11-20 21:44:44','2025-11-13 21:44:44'),
(21,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwMzAyLCJleHAiOjE3NjMwODAzODJ9.RnHF570waOOOge0Q9A6JhdKh46pp3kcrlET7driRDwA','2025-11-20 21:45:02','2025-11-13 21:45:02'),
(22,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwNzUyLCJleHAiOjE3NjMwODA4MzJ9.niT9eojioedWR_dRgiH_PjqJazspLSagf3AP9sPMHTg','2025-11-20 21:52:32','2025-11-13 21:52:32'),
(23,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwODMwLCJleHAiOjE3NjMwODA5MTB9.g38YYEKqdKlu1qa8bhIvMtv7AIfNScYpVwwzLo_Sb1Y','2025-11-20 21:53:50','2025-11-13 21:53:50'),
(24,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwODQ4LCJleHAiOjE3NjMwODA5Mjh9.4FiDodlJuTBygrhm0Bdh-xCXBkHFHH9oiYTW8DFhxAw','2025-11-20 21:54:08','2025-11-13 21:54:08'),
(25,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwOTA0LCJleHAiOjE3NjMwODA5ODR9.aG8DQOh8tok1l8sHPggypHNitbJVPgM-NX73hgLMn8g','2025-11-20 21:55:04','2025-11-13 21:55:04'),
(26,9,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjksInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcwOTQxLCJleHAiOjE3NjMwODEwMjF9.Z2uQJVMpPtia_7E-zgEMnKa4JY-PKkx3FG8MNyMDcVs','2025-11-20 21:55:41','2025-11-13 21:55:41'),
(27,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcxNjg3LCJleHAiOjE3NjMwODE3Njd9.pawdYT6H-ObWCnmJqLnYgcHFrSCOXYj4a9CBHE2KesU','2025-11-20 22:08:07','2025-11-13 22:08:07'),
(28,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMDcyMDEwLCJleHAiOjE3NjMwODIwOTB9.uxteCXkcVT1vR-E7zSpLAtLt1Y4Urhjh6TiW0e16InU','2025-11-20 22:13:30','2025-11-13 22:13:30'),
(29,8,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInR5cGUiOiJyZWZyZXNoIiwiaWF0IjoxNzYzMTk5NzgyLCJleHAiOjE3NjMyMDk4NjJ9.VhnTwwxc7v0_NBX7rv65_GuAELb_49X5DeCT2MMi3vg','2025-11-22 09:43:02','2025-11-15 09:43:02');
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `hash_password` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(8,'Sylvain','2025-11-03 17:52:54','2025-11-03 17:52:54',NULL,'sylvain.gross@outlook.fr','$2b$10$3UhwaCM8.sBJA4pUWjaHh.063ZVMScPKDvJKDRKpDEHHKG3zZOHjW'),
(9,'test','2025-11-13 21:55:41','2025-11-13 21:55:41',NULL,'test.test@test.com','$2b$10$guszsBLiRKKQLgEABljKCewzrmfnP.uaR3FTg.dkHkt0jxR9pmbPK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`appuser`@`%`*/ /*!50003 TRIGGER
  update_user_updated_at BEFORE
UPDATE
  ON users FOR EACH ROW BEGIN
SET
  NEW.updated_at = CURRENT_TIMESTAMP;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-15 18:33:42
