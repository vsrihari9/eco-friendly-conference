CREATE DATABASE  IF NOT EXISTS `conference` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `conference`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: conference
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `code` varchar(3) NOT NULL,
  PRIMARY KEY (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'ATLANTA','GA','ATL'),(2,'AUSTIN','TX','AUS'),(3,'DALLAS-FT. WORTH','TX','DFW'),(4,'DENVER','CO','DEN'),(5,'NEW YORK','NY','JFK'),(6,'SAN DIEGO','CA','SAN'),(7,'SAN FRANCISCO','CA','SFO'),(8,'SEATTLE-TACOMA','WA','SEA'),(9,'ST. LOUIS','MO','STL'),(10,'WASHINGTON','DC','IAD');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routes`
--

DROP TABLE IF EXISTS `routes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `routes` (
  `route_id` int NOT NULL AUTO_INCREMENT,
  `origin_city_id` int NOT NULL,
  `dest_city_id` int NOT NULL,
  `class` varchar(20) NOT NULL,
  `fare` decimal(10,2) NOT NULL,
  `co2` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`route_id`),
  KEY `origin_city_id` (`origin_city_id`),
  KEY `dest_city_id` (`dest_city_id`),
  CONSTRAINT `routes_ibfk_1` FOREIGN KEY (`origin_city_id`) REFERENCES `cities` (`city_id`),
  CONSTRAINT `routes_ibfk_2` FOREIGN KEY (`dest_city_id`) REFERENCES `cities` (`city_id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routes`
--

LOCK TABLES `routes` WRITE;
/*!40000 ALTER TABLE `routes` DISABLE KEYS */;
INSERT INTO `routes` VALUES (1,1,2,'premium',195.00,123.30),(2,2,1,'premium',195.00,123.20),(3,1,4,'premium',116.00,169.20),(4,4,1,'premium',116.00,169.50),(5,1,3,'premium',118.00,113.70),(6,3,1,'premium',118.00,113.70),(7,1,10,'premium',133.00,122.50),(8,10,1,'premium',133.00,122.30),(9,1,5,'premium',184.00,124.60),(10,5,1,'premium',184.00,124.30),(11,1,6,'premium',388.00,466.60),(12,6,1,'premium',388.00,466.50),(13,1,8,'premium',350.00,516.10),(14,8,1,'premium',350.00,516.10),(15,1,7,'premium',276.00,547.50),(16,7,1,'premium',276.00,547.50),(17,1,9,'premium',161.00,85.10),(18,9,1,'premium',161.00,85.60),(19,2,4,'premium',129.00,133.80),(20,4,2,'premium',129.00,129.30),(21,2,3,'premium',444.00,50.90),(22,3,2,'premium',444.00,50.80),(23,2,10,'premium',574.00,209.60),(24,10,2,'premium',574.00,209.60),(25,2,5,'premium',182.00,205.30),(26,5,2,'premium',182.00,205.30),(27,2,6,'premium',279.00,166.90),(28,6,2,'premium',279.00,165.50),(29,2,8,'premium',269.00,226.50),(30,8,2,'premium',269.00,226.50),(31,2,7,'premium',249.00,219.90),(32,7,2,'premium',249.00,220.00),(33,2,9,'premium',303.00,142.90),(34,9,2,'premium',303.00,144.30),(35,4,3,'premium',112.00,112.00),(36,3,4,'premium',112.00,112.70),(37,4,10,'premium',505.00,196.30),(38,10,4,'premium',505.00,197.60),(39,4,5,'premium',304.00,217.00),(40,5,4,'premium',304.00,217.00),(41,4,6,'premium',135.00,133.30),(42,6,4,'premium',135.00,134.40),(43,4,8,'premium',144.00,154.00),(44,8,4,'premium',144.00,155.20),(45,4,7,'premium',117.00,146.60),(46,7,4,'premium',117.00,146.80),(47,4,9,'premium',122.00,142.60),(48,9,4,'premium',122.00,141.40),(49,3,10,'premium',187.00,191.40),(50,10,3,'premium',187.00,191.60),(51,3,5,'premium',195.00,185.60),(52,5,3,'premium',195.00,185.60),(53,3,6,'premium',353.00,160.30),(54,6,3,'premium',353.00,160.30),(55,3,8,'premium',238.00,211.10),(56,8,3,'premium',238.00,211.10),(57,3,7,'premium',154.00,201.00),(58,7,3,'premium',154.00,201.00),(59,3,9,'premium',410.00,103.10),(60,9,3,'premium',410.00,103.10),(61,10,5,'premium',127.00,80.80),(62,5,10,'premium',127.00,80.80),(63,10,6,'premium',586.00,538.90),(64,6,10,'premium',586.00,540.60),(65,10,8,'premium',289.00,575.60),(66,8,10,'premium',289.00,576.70),(67,10,7,'premium',475.00,592.20),(68,7,10,'premium',475.00,592.30),(69,10,9,'premium',390.00,172.90),(70,9,10,'premium',390.00,172.40),(71,5,6,'premium',280.00,566.70),(72,6,5,'premium',280.00,568.40),(73,5,8,'premium',279.00,574.60),(74,8,5,'premium',279.00,574.60),(75,5,7,'premium',240.00,592.10),(76,7,5,'premium',240.00,592.10),(77,5,9,'premium',222.00,553.00),(78,9,5,'premium',222.00,553.00),(79,6,8,'premium',114.00,150.40),(80,8,6,'premium',114.00,150.40),(81,6,7,'premium',62.00,103.40),(82,7,6,'premium',62.00,103.10),(83,6,9,'premium',385.00,204.80),(84,9,6,'premium',385.00,204.50),(85,8,7,'premium',69.00,118.10),(86,7,8,'premium',69.00,119.10),(87,8,9,'premium',278.00,213.80),(88,9,8,'premium',278.00,213.70),(89,7,9,'premium',280.00,300.90),(90,9,7,'premium',278.00,300.90),(91,1,2,'economy',127.00,123.30),(92,2,1,'economy',127.00,123.20),(93,1,4,'economy',85.00,169.20),(94,4,1,'economy',85.00,169.50),(95,1,3,'economy',81.00,113.70),(96,3,1,'economy',81.00,113.70),(97,1,10,'economy',86.00,122.50),(98,10,1,'economy',86.00,122.30),(99,1,5,'economy',90.00,124.60),(100,5,1,'economy',90.00,124.30),(101,1,6,'economy',232.00,233.30),(102,6,1,'economy',232.00,233.20),(103,1,8,'economy',270.00,258.10),(104,8,1,'economy',270.00,258.10),(105,1,7,'economy',186.00,273.70),(106,7,1,'economy',186.00,273.70),(107,1,9,'economy',105.00,85.10),(108,9,1,'economy',105.00,85.60),(109,2,4,'economy',89.00,133.80),(110,4,2,'economy',89.00,129.30),(111,2,3,'economy',307.00,50.90),(112,3,2,'economy',307.00,50.80),(113,2,10,'economy',286.00,209.60),(114,10,2,'economy',286.00,209.60),(115,2,5,'economy',125.00,205.30),(116,5,2,'economy',125.00,205.30),(117,2,6,'economy',119.00,166.90),(118,6,2,'economy',119.00,165.50),(119,2,8,'economy',129.00,226.50),(120,8,2,'economy',129.00,226.50),(121,2,7,'economy',129.00,219.90),(122,7,2,'economy',129.00,220.00),(123,2,9,'economy',185.00,142.90),(124,9,2,'economy',185.00,144.30),(125,4,3,'economy',68.00,112.00),(126,3,4,'economy',68.00,112.70),(127,4,10,'economy',252.00,196.30),(128,10,4,'economy',252.00,197.60),(129,4,5,'economy',197.00,217.00),(130,5,4,'economy',197.00,217.00),(131,4,6,'economy',87.00,133.30),(132,6,4,'economy',87.00,134.40),(133,4,8,'economy',69.00,154.00),(134,8,4,'economy',69.00,155.20),(135,4,7,'economy',71.00,146.60),(136,7,4,'economy',71.00,146.80),(137,4,9,'economy',85.00,142.60),(138,9,4,'economy',85.00,141.40),(139,3,10,'economy',115.00,191.40),(140,10,3,'economy',115.00,191.60),(141,3,5,'economy',119.00,185.60),(142,5,3,'economy',119.00,185.60),(143,3,6,'economy',218.00,160.30),(144,6,3,'economy',218.00,160.30),(145,3,8,'economy',147.00,211.10),(146,8,3,'economy',147.00,211.10),(147,3,7,'economy',85.00,201.00),(148,7,3,'economy',85.00,201.00),(149,3,9,'economy',309.00,103.10),(150,9,3,'economy',309.00,103.10),(151,10,5,'economy',82.00,80.80),(152,5,10,'economy',82.00,80.80),(153,10,6,'economy',293.00,269.40),(154,6,10,'economy',293.00,270.30),(155,10,8,'economy',159.00,287.80),(156,8,10,'economy',159.00,288.30),(157,10,7,'economy',245.00,296.10),(158,7,10,'economy',245.00,296.20),(159,10,9,'economy',195.00,172.90),(160,9,10,'economy',195.00,172.40),(161,5,6,'economy',175.00,283.30),(162,6,5,'economy',175.00,284.20),(163,5,8,'economy',129.00,287.30),(164,8,5,'economy',129.00,287.30),(165,5,7,'economy',140.00,296.10),(166,7,5,'economy',140.00,296.10),(167,5,9,'economy',137.00,276.50),(168,9,5,'economy',137.00,276.50),(169,6,8,'economy',69.00,150.40),(170,8,6,'economy',69.00,150.40),(171,6,7,'economy',58.00,103.40),(172,7,6,'economy',58.00,103.10),(173,6,9,'economy',214.00,204.80),(174,9,6,'economy',214.00,204.50),(175,8,7,'economy',62.00,118.10),(176,7,8,'economy',62.00,119.10),(177,8,9,'economy',164.00,213.80),(178,9,8,'economy',164.00,213.70),(179,7,9,'economy',164.00,300.90),(180,9,7,'economy',164.00,300.90);
/*!40000 ALTER TABLE `routes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-10 20:02:06
