-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: linked_in
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` varchar(45) NOT NULL,
  `likes` int NOT NULL,
  `post_id` int NOT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (3,'duuuuuude',0,1,1),(4,'c2',0,1,1),(5,'success',0,2,1),(6,'success',0,2,1),(7,'notiification test',0,4,1),(8,'2nd',0,4,1),(9,'giorgosiii',0,26,1),(10,'fghfgh',0,7,2),(11,'giatiiii',0,32,2),(12,'it works',0,34,1),(13,'hjkfhgjfigf',0,37,1);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `final_posts`
--

DROP TABLE IF EXISTS `final_posts`;
/*!50001 DROP VIEW IF EXISTS `final_posts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `final_posts` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `text`,
 1 AS `likes`,
 1 AS `author_id`,
 1 AS `subjects`,
 1 AS `image`,
 1 AS `views`,
 1 AS `user_id`,
 1 AS `name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `friend_requests`
--

DROP TABLE IF EXISTS `friend_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friend_requests` (
  `sender` int NOT NULL,
  `receiver` int NOT NULL,
  `accepted` tinyint NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friend_requests`
--

LOCK TABLES `friend_requests` WRITE;
/*!40000 ALTER TABLE `friend_requests` DISABLE KEYS */;
INSERT INTO `friend_requests` VALUES (4,3,0,4),(27,3,0,5),(29,3,0,7),(2,31,0,9),(2,3,1,10),(2,1,1,11),(1,3,1,12);
/*!40000 ALTER TABLE `friend_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `friendposts`
--

DROP TABLE IF EXISTS `friendposts`;
/*!50001 DROP VIEW IF EXISTS `friendposts`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `friendposts` AS SELECT 
 1 AS `id`,
 1 AS `title`,
 1 AS `text`,
 1 AS `likes`,
 1 AS `author_id`,
 1 AS `subjects`,
 1 AS `image`,
 1 AS `views`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `iso`
--

DROP TABLE IF EXISTS `iso`;
/*!50001 DROP VIEW IF EXISTS `iso`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `iso` AS SELECT 
 1 AS `message`,
 1 AS `user1`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `isoo`
--

DROP TABLE IF EXISTS `isoo`;
/*!50001 DROP VIEW IF EXISTS `isoo`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `isoo` AS SELECT 
 1 AS `message`,
 1 AS `user2`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `likedata`
--

DROP TABLE IF EXISTS `likedata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likedata` (
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1692 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likedata`
--

LOCK TABLES `likedata` WRITE;
/*!40000 ALTER TABLE `likedata` DISABLE KEYS */;
INSERT INTO `likedata` VALUES (1,1,1),(2,2,2),(2,3,51),(1,4,1678),(1,5,1681),(1,3,1682),(1,2,1683),(1,6,1684),(1,26,1685),(2,29,1686),(2,32,1687),(1,34,1688),(27,35,1689),(27,36,1690),(1,37,1691);
/*!40000 ALTER TABLE `likedata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `list`
--

DROP TABLE IF EXISTS `list`;
/*!50001 DROP VIEW IF EXISTS `list`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `list` AS SELECT 
 1 AS `id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `sender_id` int NOT NULL,
  `receiver_id` int NOT NULL,
  `time` datetime NOT NULL,
  `message` varchar(500) NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messenger`
--

DROP TABLE IF EXISTS `messenger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` mediumtext,
  `user1` int DEFAULT NULL,
  `user2` int DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger`
--

LOCK TABLES `messenger` WRITE;
/*!40000 ALTER TABLE `messenger` DISABLE KEYS */;
INSERT INTO `messenger` VALUES (2,'gdfgdfgdgfdf',1,2,'2021-08-18 03:21:39'),(3,'fgnvfbvbn',1,2,'2021-08-18 03:21:53'),(4,'test',1,2,'2021-08-18 03:22:47'),(5,'gfhxgxgfxxf',1,2,'2021-08-18 03:25:01'),(6,'gfh',1,2,'2021-09-12 00:18:37');
/*!40000 ALTER TABLE `messenger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `my_chat`
--

DROP TABLE IF EXISTS `my_chat`;
/*!50001 DROP VIEW IF EXISTS `my_chat`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `my_chat` AS SELECT 
 1 AS `message`,
 1 AS `user1`,
 1 AS `user2`,
 1 AS `date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `notify` varchar(200) NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (2,'user: pavlosap commented on one of your posts ',4,3),(6,'user: pavlosap commented on one of your posts ',5,3),(7,'user: pavlosap commented on one of your posts ',3,3),(9,'user: pavlosap liked one of your posts ',2,3),(10,'user: pavlosap liked one of your posts ',6,3),(11,'user: pavlosap liked one of your posts ',26,1),(12,'user: pavlosap commented on one of your posts ',26,1),(13,'user: papageorge liked one of your posts ',29,1),(14,'user: papageorge commented on one of your posts ',7,3),(15,'user: papageorge liked one of your posts ',32,1),(16,'user: papageorge commented on one of your posts ',32,1),(17,'user: pavlosap liked one of your posts ',34,1),(18,'user: pavlosap commented on one of your posts ',34,1),(19,'user: aa liked one of your posts ',35,27),(20,'user: aa liked one of your posts ',36,27),(21,'user: pavlosap liked one of your posts ',37,27),(22,'user: pavlosap commented on one of your posts ',37,27);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `per`
--

DROP TABLE IF EXISTS `per`;
/*!50001 DROP VIEW IF EXISTS `per`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `per` AS SELECT 
 1 AS `message`,
 1 AS `user2`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `text` varchar(45) NOT NULL,
  `likes` int NOT NULL,
  `author_id` int NOT NULL,
  `subjects` varchar(300) DEFAULT NULL,
  `image` varchar(200) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'pavlos','pavlos2',1,3,NULL,NULL,21),(2,'giorgos','giorgos2',2,3,NULL,NULL,21),(3,'nikos','nikos1',2,3,NULL,NULL,21),(4,'gios','gios2',1,3,NULL,NULL,21),(5,'nikos','nikos1',1,3,NULL,NULL,21),(6,'nikos','nikos1',1,3,NULL,NULL,21),(7,'antee','anteeeeeeeeee',0,3,NULL,NULL,21),(8,'sdfsdf','sfsfsdf',0,3,NULL,NULL,21),(9,'work','doyleyei',0,3,NULL,NULL,21),(10,'grg','rgregreg',0,3,NULL,NULL,21),(11,'trhrthrthrthr','rthrthrthrthr',0,3,NULL,NULL,21),(12,'final','final test',0,3,NULL,NULL,21),(13,'fhdfhgbdfg','dbfbdfb',0,3,NULL,NULL,21),(14,'pavlospost','first',0,4,NULL,NULL,0),(26,'mpam','bam',1,1,NULL,NULL,21),(27,'aggelia1','aggelia1',0,4,'aggelia',NULL,2),(28,'aggelia1','aggelia1',0,4,'aggelia',NULL,2),(29,'first no aggelia','first no aggelia',1,1,NULL,NULL,21),(30,'second no aggelia','second no aggelia',0,1,NULL,NULL,21),(31,'first aggelia by user','first aggelia by user',0,2,'aggelia',NULL,16),(33,'first img','first img post',0,1,NULL,'uploads/download.png',21),(34,'first with view','first with view',1,1,NULL,'',21),(35,'matrix','matrix',1,27,NULL,'',5),(36,'matrix','matrix',1,27,NULL,'',4),(37,'matrix','matrix',1,27,NULL,'',3),(38,'matrix','matrix',0,27,NULL,'',2),(39,'matrix','matrix',0,27,NULL,'',1),(40,'gg','gg',0,1,NULL,'uploads/download.png',2);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privacy_settings`
--

DROP TABLE IF EXISTS `privacy_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privacy_settings` (
  `user_id` int NOT NULL,
  `email` tinyint DEFAULT '1',
  `professional_position` tinyint DEFAULT '1',
  `company` tinyint DEFAULT '1',
  `interests` tinyint DEFAULT '1',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privacy_settings`
--

LOCK TABLES `privacy_settings` WRITE;
/*!40000 ALTER TABLE `privacy_settings` DISABLE KEYS */;
INSERT INTO `privacy_settings` VALUES (1,1,0,0,1),(2,1,1,1,1),(3,1,1,1,1),(27,1,1,1,1),(50,1,1,1,1);
/*!40000 ALTER TABLE `privacy_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `private_chat`
--

DROP TABLE IF EXISTS `private_chat`;
/*!50001 DROP VIEW IF EXISTS `private_chat`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `private_chat` AS SELECT 
 1 AS `id`,
 1 AS `message`,
 1 AS `user1`,
 1 AS `user2`,
 1 AS `date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `interests` varchar(45) DEFAULT NULL,
  `professional_position` varchar(45) NOT NULL,
  `company` varchar(45) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `password` varchar(45) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `views` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'pavlosmail','pavlosap','gaming movies ','CEO','Sony',0,'pavloscode','',345),(2,'georgemail','papageorge','yyping aggelia','CEO','Ios',0,'georgecode','',44),(3,'useremail','user1','tipota','tipota','tipota',0,'user1pass','',0),(4,'newmail','user1','tipota','tipota','tipota',0,'user1pass','',0),(27,'a','aa','aa','aa','aa',0,'aa','',15),(28,'aa','aa','aa','aa','aa',0,'aa','',0),(29,'aaa','aa','aa','aa','aa',0,'aa','',0),(30,'aaaaa','aa','aa','aa','aa',0,'aa','',0),(31,'b','bb','bb','bb','bb',0,'bb','',0),(32,'hh','hh','hh','hh','hh',0,'hh','',0),(33,'cc','cc','cc','cc','cc',0,'cc','',0),(34,'vv','vv','vv','vv','vv',0,'vv','',0),(35,'hhhhh','hhh','hh','hh','hh',0,'hh','',0),(36,'pp','pp','pp','pp','pp',0,'pp','',0),(37,'fffffffff','f','f','f','f',0,'fffffffff','',0),(38,'vvvvvvvvvv','vv','vv','vv','vv',0,'vv','',0),(39,'t','t','t','t','t',0,'t','',0),(40,'ccc','cc','cc','cc','cc',0,'cc','',0),(41,'rr','rr','rr','rr','rr',0,'rr','',0),(42,'eee','ee','ee','ee','ee',0,'ee','',0),(43,'oo','oo','oo','oo','oo',0,'oo','',0),(44,'mm','mm','mm','mm','mm',0,'mm','',0),(45,'xx','x','x','x','x',0,'xx','',0),(46,'td','null','null','null','null',0,'cc','',0),(47,'rt','null','null','null','null',0,'null','',0),(48,'xcxc','xcxc','xc','xcx','xc',0,'xcxc','',0),(49,'FHGFGHFGH','FHFGH','FHFGH','FHFGH','FHFGHFGH',0,'FHFGHF','',0),(50,'adminmail','admin','administration','admin','uoa',1,'admincode','',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `final_posts`
--

/*!50001 DROP VIEW IF EXISTS `final_posts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `final_posts` AS select `friendposts`.`id` AS `id`,`friendposts`.`title` AS `title`,`friendposts`.`text` AS `text`,`friendposts`.`likes` AS `likes`,`friendposts`.`author_id` AS `author_id`,`friendposts`.`subjects` AS `subjects`,`friendposts`.`image` AS `image`,`friendposts`.`views` AS `views`,`u`.`user_id` AS `user_id`,`u`.`name` AS `name` from (`friendposts` join (select `user`.`id` AS `user_id`,`user`.`name` AS `name` from `user`) `u`) where (`friendposts`.`author_id` = `u`.`user_id`) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `friendposts`
--

/*!50001 DROP VIEW IF EXISTS `friendposts`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `friendposts` AS select `p`.`id` AS `id`,`p`.`title` AS `title`,`p`.`text` AS `text`,`p`.`likes` AS `likes`,`p`.`author_id` AS `author_id`,`p`.`subjects` AS `subjects`,`p`.`image` AS `image`,`p`.`views` AS `views` from `posts` `p` where (((`p`.`subjects` is null) and exists(select `f`.`receiver` from (select `friend_requests`.`receiver` AS `receiver` from `friend_requests` where ((`friend_requests`.`sender` = 1) and (`friend_requests`.`accepted` = 1)) union select `friend_requests`.`sender` AS `sender` from `friend_requests` where ((`friend_requests`.`receiver` = 1) and (`friend_requests`.`accepted` = 1))) `f` where (`f`.`receiver` = `p`.`author_id`))) or (`p`.`author_id` = 1)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `iso`
--

/*!50001 DROP VIEW IF EXISTS `iso`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `iso` AS select `my_chat`.`message` AS `message`,`my_chat`.`user1` AS `user1` from `my_chat` where (`my_chat`.`user2` = '1') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `isoo`
--

/*!50001 DROP VIEW IF EXISTS `isoo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `isoo` AS select `my_chat`.`message` AS `message`,`my_chat`.`user2` AS `user2` from `my_chat` where (`my_chat`.`user1` = '1') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `list`
--

/*!50001 DROP VIEW IF EXISTS `list`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `list` AS select `friendposts`.`id` AS `id` from `friendposts` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `my_chat`
--

/*!50001 DROP VIEW IF EXISTS `my_chat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `my_chat` AS select `messenger`.`message` AS `message`,`messenger`.`user1` AS `user1`,`messenger`.`user2` AS `user2`,`messenger`.`date` AS `date` from `messenger` where ((`messenger`.`user1` = '1') or (`messenger`.`user2` = '1')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `per`
--

/*!50001 DROP VIEW IF EXISTS `per`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `per` AS select `isoo`.`message` AS `message`,`isoo`.`user2` AS `user2` from `isoo` union select `iso`.`message` AS `message`,`iso`.`user1` AS `user1` from `iso` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `private_chat`
--

/*!50001 DROP VIEW IF EXISTS `private_chat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `private_chat` AS select `messenger`.`id` AS `id`,`messenger`.`message` AS `message`,`messenger`.`user1` AS `user1`,`messenger`.`user2` AS `user2`,`messenger`.`date` AS `date` from `messenger` where (((`messenger`.`user1` = '1') and (`messenger`.`user2` = '2')) or ((`messenger`.`user1` = '2') and (`messenger`.`user2` = '1'))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-12  0:53:22
