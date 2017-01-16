/*
SQLyog Ultimate v11.11 (32 bit)
MySQL - 5.6.31-0ubuntu0.15.10.1 : Database - ithuse
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ithuse` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `ithuse`;

/*Table structure for table `categorys` */

DROP TABLE IF EXISTS `categorys`;

CREATE TABLE `categorys` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(225) DEFAULT NULL,
  `is_active` int(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `categorys` */

insert  into `categorys`(`id`,`category_name`,`is_active`) values (1,'Office of the Director',1),(2,'Student Governance',1),(3,'Student Counselling',1),(4,'Student Health',1),(5,'Disability Unit',1),(6,'Student Development',1),(7,'Orientation',1);

/*Table structure for table `document_lists` */

DROP TABLE IF EXISTS `document_lists`;

CREATE TABLE `document_lists` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(225) DEFAULT NULL,
  `category_id` int(10) DEFAULT NULL,
  `sub_category_id` int(10) DEFAULT NULL,
  `updation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

/*Data for the table `document_lists` */

insert  into `document_lists`(`id`,`title`,`category_id`,`sub_category_id`,`updation_date`,`is_active`) values (17,'Updated Title',5,9,'2017-01-12 21:17:50',0),(18,'rthgtghb',6,11,'2017-01-12 21:20:05',0),(19,'tyuhb',1,1,'2017-01-12 21:19:15',0),(20,'fghn',3,6,'2017-01-13 13:14:20',1),(21,'weddcc',7,14,'2017-01-13 13:20:12',1),(22,'Like it',3,5,'2017-01-12 21:20:55',0),(23,'Title Good',2,4,'2017-01-12 21:20:47',0),(24,'new doc',5,9,'2017-01-13 12:05:28',0),(25,'Title',3,5,'2017-01-12 21:21:26',1),(26,'ihbiujn',1,1,'2017-01-13 13:38:45',1),(27,'ftghnb',1,2,'2017-01-13 13:53:35',1),(28,'rythb',5,10,'2017-01-16 13:56:30',0),(29,'dxfv',7,13,'2017-01-13 17:00:41',1),(30,'refdc',5,9,'2017-01-16 13:56:23',0),(31,'dtrghb',2,3,'2017-01-13 16:58:35',1),(32,'dxfv',2,4,'2017-01-13 17:00:55',1);

/*Table structure for table `events` */

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `event_id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin,
  `event_venue` varchar(225) COLLATE utf8_bin DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `status` enum('complete','pending') COLLATE utf8_bin DEFAULT 'pending',
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `events` */

insert  into `events`(`event_id`,`title`,`description`,`event_venue`,`event_date`,`event_time`,`status`,`is_active`) values (24,'Team Meeting','Discussion about project.','Meeting Room','2017-01-16',NULL,'pending',0),(25,'Team Meeting','Discussion about project.','','2017-01-16',NULL,'pending',0),(26,'5e','etrgh','','2017-01-13',NULL,'pending',0),(27,'raqewdf','qwef weaf weaf ew f ew rf fr  rwfe','qwef','2017-01-13',NULL,'pending',0),(28,'Team party','NYE Party plddll lplspdlk retge getr gtre g.','xyz place','2017-01-11','10:05:00','complete',1),(29,'Title Changed','rtfgvtrgv rtg rth  r gr   hyyhr hryhbgr','rtghb','2017-01-27','10:05:00','pending',1),(30,'ghnbgfnb','dib id v hruirui h uihuihuihuihurhuh buhriub','retbgv','2017-01-28',NULL,'pending',0),(31,'redf','e e g rtgrtgrtgtgrggfgdfgdfgdfgdfgdfg','dfgdfg','2017-01-28','06:15:00','pending',0),(32,'ertgv e gteg etg','eg etgrbrbrggggvfgbfgbgbrgbrgb','erf','2017-01-28','22:20:00','pending',1),(33,'efrgvvc','eg etgrbrbrggggvfgbfgbgbrgbrgb','erfgefrvc','2017-01-28',NULL,'pending',0),(34,'werdfvcrefvc','eg etgrbrbrggggvfgbfgbgbrgbrgb','erfgvrefvcrefvce','2017-01-28',NULL,'pending',0),(35,'Title','Its a Long Description  for the event.','Venue','2017-01-20','06:00:00','pending',1),(36,'Title Added 1','This error occurs when expression the ngModel directive is bound to is a non-assignable expression.\n\nExamples using assignable expressions include:','Venue decisedds','2017-01-26','06:00:00','pending',1),(37,'fsregv','rtsegtregb  try htyhthtdhnbghnb ghnbfgnbf','hdfghnbfgh','2017-01-28','06:10:00','pending',0);

/*Table structure for table `login_histories` */

DROP TABLE IF EXISTS `login_histories`;

CREATE TABLE `login_histories` (
  `id` int(20) unsigned NOT NULL AUTO_INCREMENT,
  `login_user_id` int(10) unsigned DEFAULT NULL,
  `login_time` datetime DEFAULT NULL,
  `logout_time` datetime DEFAULT NULL,
  `ip_address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `login_histories` */

insert  into `login_histories`(`id`,`login_user_id`,`login_time`,`logout_time`,`ip_address`,`user_agent`,`is_active`) values (76,1,'2017-01-06 13:27:03','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(77,1,'2017-01-06 13:29:19','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(78,1,'2017-01-06 13:47:09','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(79,1,'2017-01-06 13:47:28','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(80,1,'2017-01-06 13:48:52','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(81,1,'2017-01-06 14:12:45','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(82,1,'2017-01-06 16:20:35','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(83,1,'2017-01-09 11:37:32','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(84,1,'2017-01-09 18:56:40','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(85,1,'2017-01-09 19:03:40','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(86,1,'2017-01-09 19:32:53','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(87,1,'2017-01-09 19:35:29','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(88,1,'2017-01-09 19:36:00','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(89,1,'2017-01-09 20:03:15','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(90,1,'2017-01-10 12:07:25','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(91,1,'2017-01-10 12:47:27','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(92,1,'2017-01-10 19:13:31','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(93,1,'2017-01-10 19:44:51','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(94,1,'2017-01-11 12:30:12','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(95,1,'2017-01-12 11:46:11','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(96,1,'2017-01-12 17:17:55','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(97,1,'2017-01-12 19:38:08','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(98,1,'2017-01-13 12:01:59','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(99,1,'2017-01-13 16:13:30','2017-01-16 16:52:16','192.168.1.117','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(100,1,'2017-01-16 11:55:18','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(101,1,'2017-01-16 15:41:08','2017-01-16 16:52:16','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(102,1,'2017-01-16 16:52:19',NULL,'127.0.0.1','Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',1);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`migration`,`batch`) values ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1);

/*Table structure for table `mobile_details` */

DROP TABLE IF EXISTS `mobile_details`;

CREATE TABLE `mobile_details` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `imei` int(50) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `document_id` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

/*Data for the table `mobile_details` */

insert  into `mobile_details`(`id`,`imei`,`date`,`document_id`) values (1,123456789,'2017-01-12 17:00:35',1),(2,123456789,'2017-01-12 17:11:02',1),(3,123456789,'2017-01-12 17:23:58',1),(4,456465,'2017-01-12 17:27:57',1),(5,456465,'2017-01-12 18:31:45',1),(6,456465,'2017-01-12 18:36:29',1),(7,456465,'2017-01-12 18:36:32',1),(8,456465,'2017-01-12 18:37:08',1),(9,2147483647,'2017-01-12 18:51:59',1),(10,2147483647,'2017-01-12 18:58:13',1),(11,2147483647,'2017-01-12 19:04:43',1),(12,2147483647,'2017-01-12 19:04:53',1),(13,2147483647,'2017-01-12 19:05:06',1),(14,2147483647,'2017-01-12 19:05:11',1),(15,2147483647,'2017-01-12 19:05:14',1),(16,2147483647,'2017-01-12 19:05:20',1),(17,2147483647,'2017-01-12 19:16:02',1),(18,2147483647,'2017-01-12 19:16:17',1),(19,2147483647,'2017-01-12 19:16:20',1),(20,2147483647,'2017-01-12 19:16:50',1),(21,2147483647,'2017-01-12 19:18:31',9),(22,2147483647,'2017-01-12 19:18:37',9),(23,2147483647,'2017-01-12 19:19:00',9),(24,2147483647,'2017-01-12 19:21:14',1),(25,2147483647,'2017-01-12 19:21:24',1),(26,2147483647,'2017-01-12 19:36:10',1),(27,2147483647,'2017-01-12 19:39:31',1),(28,2147483647,'2017-01-12 19:58:51',1),(29,2147483647,'2017-01-12 19:59:02',1),(30,2147483647,'2017-01-12 19:59:28',1),(31,2147483647,'2017-01-12 19:59:43',1),(32,2147483647,'2017-01-12 20:00:05',1),(33,2147483647,'2017-01-13 15:20:18',1),(34,2147483647,'2017-01-16 12:53:38',1),(35,2147483647,'2017-01-16 12:57:10',1);

/*Table structure for table `password_resets` */

DROP TABLE IF EXISTS `password_resets`;

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `password_resets` */

/*Table structure for table `pdf_reports` */

DROP TABLE IF EXISTS `pdf_reports`;

CREATE TABLE `pdf_reports` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pdf_name` varchar(225) DEFAULT NULL,
  `uploading_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `document_id` int(10) DEFAULT NULL,
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=latin1;

/*Data for the table `pdf_reports` */

insert  into `pdf_reports`(`id`,`pdf_name`,`uploading_date`,`document_id`,`is_active`) values (9,'pdf_document/Student Development/Leadership development/document.pdf','2017-01-12 21:20:05',18,0),(10,'pdf_document/Office of the Director/Director’s Projects/document.pdf','2017-01-12 21:19:15',19,0),(17,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-12 18:10:47',17,0),(18,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-12 18:13:05',17,0),(19,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-12 18:14:10',17,0),(20,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-12 21:17:50',17,0),(21,'pdf_document/Student Counselling/Learning, development and career counselling/document.pdf','2017-01-12 19:57:34',20,0),(22,'pdf_document/Orientation/Orientation Programme/document.pdf','2017-01-13 13:20:12',21,0),(23,'pdf_document/Student Counselling/Emotional Support/document.pdf','2017-01-12 19:57:57',20,0),(24,'pdf_document/Student Counselling/Emotional Support/document.pdf','2017-01-12 20:00:44',20,0),(25,'pdf_document/Student Counselling/Emotional Support/document.pdf','2017-01-13 13:14:20',20,0),(26,'pdf_document/Student Counselling/Emotional Support/document.pdf','2017-01-12 21:20:55',22,0),(27,'pdf_document/Student Governance/Societies/document.pdf','2017-01-12 21:20:47',23,0),(28,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 12:05:28',24,0),(29,'pdf_document/Student Counselling/Emotional Support/document.pdf','2017-01-12 21:21:26',25,1),(30,'pdf_document/Office of the Director/Director’s Projects/document.pdf','2017-01-13 12:51:30',26,0),(31,'pdf_document/Office of the Director/Director’s Projects/document.pdf','2017-01-13 13:25:58',26,0),(32,'pdf_document/Office of the Director/Director’s Projects/document.pdf','2017-01-13 13:34:45',26,0),(33,'pdf_document/Office of the Director/Director’s Projects/document.pdf','2017-01-13 13:38:45',26,0),(34,'pdf_document/Office of the Director/Director’s Projects/document.pdf','2017-01-13 13:38:45',26,1),(35,'pdf_document/Office of the Director/Policies/document.pdf','2017-01-13 13:53:35',27,1),(36,'pdf_document/Disability Unit/Test and academic development/document.pdf','2017-01-13 13:55:51',28,0),(37,'pdf_document/Orientation/New Students/document.pdf','2017-01-13 14:19:25',29,0),(38,'pdf_document/Disability Unit/Test and academic development/document.pdf','2017-01-16 13:56:30',28,0),(39,'pdf_document/Orientation/New Students/document.pdf','2017-01-13 17:00:41',29,0),(40,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 16:52:11',30,0),(41,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 16:53:04',30,0),(42,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 16:54:12',30,0),(43,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 16:55:16',30,0),(44,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 16:59:05',30,0),(45,'pdf_document/Student Governance/Student Representative Council/document.pdf','2017-01-13 16:58:35',31,1),(46,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-13 17:00:02',30,0),(47,'pdf_document/Disability Unit/Academic Support/document.pdf','2017-01-16 13:56:23',30,0),(48,'pdf_document/Orientation/New Students/document.pdf','2017-01-13 17:00:41',29,1),(49,'pdf_document/Student Governance/Societies/document.pdf','2017-01-13 17:00:55',32,1);

/*Table structure for table `sub_categorys` */

DROP TABLE IF EXISTS `sub_categorys`;

CREATE TABLE `sub_categorys` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sub_category_name` varchar(225) DEFAULT NULL,
  `category_id` int(10) DEFAULT NULL,
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `sub_categorys` */

insert  into `sub_categorys`(`id`,`sub_category_name`,`category_id`,`is_active`) values (1,'Director’s Projects',1,1),(2,'Policies',1,1),(3,'Student Representative Council',2,1),(4,'Societies',2,1),(5,'Emotional Support',3,1),(6,'Learning, development and career counselling',3,1),(7,'Our Services',4,1),(8,'Monthly Health Topics',4,1),(9,'Academic Support',5,1),(10,'Test and academic development',5,1),(11,'Leadership development',6,1),(12,'Student Life',6,1),(13,'New Students',7,1),(14,'Orientation Programme',7,1);

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `last_login_time` timestamp NULL DEFAULT NULL,
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`name`,`email`,`password`,`remember_token`,`created_at`,`updated_at`,`last_login_time`,`is_active`) values (1,'Abhishek','abhishekgupta00143@gmail.com','$2y$10$0F4Us.bfO64bkodcdSBKlOBItJnA4g9BAp7VutxP0A7o78rDwhOHS','SoSm6KlV7J0CWZi4KvY1eN7aaVzQ2glGbf3FMxkaWhJMnnHA87ssVBXq33qV','2017-01-05 13:58:21','2017-01-16 16:52:19','2017-01-16 16:52:19',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
