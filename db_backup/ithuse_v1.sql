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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `document_lists` */

insert  into `document_lists`(`id`,`title`,`category_id`,`sub_category_id`,`updation_date`,`is_active`) values (11,'Title 1',7,13,'2017-01-11 12:31:33',1),(12,'Service policy',5,9,'2017-01-11 12:31:49',1),(13,'Time Management',3,6,'2017-01-11 12:31:58',1),(14,'rrrrrrrrrrr',6,11,'2017-01-11 20:50:30',1);

/*Table structure for table `events` */

DROP TABLE IF EXISTS `events`;

CREATE TABLE `events` (
  `event_id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `description` text COLLATE utf8_bin,
  `event_venue` varchar(225) COLLATE utf8_bin DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `status` enum('complete','pending') COLLATE utf8_bin DEFAULT 'pending',
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

/*Data for the table `events` */

insert  into `events`(`event_id`,`title`,`description`,`event_venue`,`event_date`,`status`,`is_active`) values (24,'Team Meeting','Discussion about project.','Meeting Room','2017-01-16 06:15:00','pending',0),(25,'Team Meeting','Discussion about project.','','2017-01-16 06:15:00','pending',0),(26,'5e','etrgh','','2017-01-13 06:10:00','pending',0),(27,'raqewdf','qwef weaf weaf ew f ew rf fr  rwfe','qwef','2017-01-13 06:20:00','pending',0),(28,'Team party','NYE Party plddll lplspdlk retge getr gtre g.','xyz place','2017-01-11 06:20:00','pending',0),(29,'trefgv','rtfgvtrgv rtg rth  r gr   hyyhr hryhbgr','rtghb','2017-01-27 06:00:00','pending',1),(30,'ghnbgfnb','dib id v hruirui h uihuihuihuihurhuh buhriub','retbgv','2017-01-28 06:15:00','pending',0),(31,'redf','e e g rtgrtgrtgtgrggfgdfgdfgdfgdfgdfg','dfgdfg','2017-01-28 06:10:00','pending',1),(32,'ertgv e gteg etg','eg etgrbrbrggggvfgbfgbgbrgbrgb','erf','2017-01-28 06:15:00','pending',1),(33,'efrgvvc','eg etgrbrbrggggvfgbfgbgbrgbrgb','erfgefrvc','2017-01-28 06:25:00','pending',0),(34,'werdfvcrefvc','eg etgrbrbrggggvfgbfgbgbrgbrgb','erfgvrefvcrefvce','2017-01-28 06:15:00','pending',0);

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
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `login_histories` */

insert  into `login_histories`(`id`,`login_user_id`,`login_time`,`logout_time`,`ip_address`,`user_agent`,`is_active`) values (76,1,'2017-01-06 13:27:03','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(77,1,'2017-01-06 13:29:19','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(78,1,'2017-01-06 13:47:09','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(79,1,'2017-01-06 13:47:28','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(80,1,'2017-01-06 13:48:52','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(81,1,'2017-01-06 14:12:45','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(82,1,'2017-01-06 16:20:35','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(83,1,'2017-01-09 11:37:32','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(84,1,'2017-01-09 18:56:40','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(85,1,'2017-01-09 19:03:40','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(86,1,'2017-01-09 19:32:53','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(87,1,'2017-01-09 19:35:29','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(88,1,'2017-01-09 19:36:00','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(89,1,'2017-01-09 20:03:15','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(90,1,'2017-01-10 12:07:25','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(91,1,'2017-01-10 12:47:27','2017-01-10 19:13:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(92,1,'2017-01-10 19:13:31',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',1),(93,1,'2017-01-10 19:44:51',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',1),(94,1,'2017-01-11 12:30:12',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',1);

/*Table structure for table `migrations` */

DROP TABLE IF EXISTS `migrations`;

CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `migrations` */

insert  into `migrations`(`migration`,`batch`) values ('2014_10_12_000000_create_users_table',1),('2014_10_12_100000_create_password_resets_table',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Data for the table `pdf_reports` */

insert  into `pdf_reports`(`id`,`pdf_name`,`uploading_date`,`document_id`,`is_active`) values (2,'pdf_document/document.pdf','2017-01-10 19:04:09',11,1),(3,'pdf_document/document.pdf','2017-01-10 19:05:05',12,1),(4,'pdf_document/document.pdf','2017-01-10 19:06:53',13,1),(5,'pdf_document/document.pdf','2017-01-11 20:50:30',14,1);

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

insert  into `users`(`id`,`name`,`email`,`password`,`remember_token`,`created_at`,`updated_at`,`last_login_time`,`is_active`) values (1,'Abhishek','abhishekgupta00143@gmail.com','$2y$10$0F4Us.bfO64bkodcdSBKlOBItJnA4g9BAp7VutxP0A7o78rDwhOHS','aJgw94xWOCXNEH4g8djOwaF9dNKQTpjvaRdwddlAoVbXs8NAB0tKi8w54aa4','2017-01-05 13:58:21','2017-01-11 12:30:12','2017-01-11 12:30:12',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
