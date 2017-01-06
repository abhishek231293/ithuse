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
  `is_active` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `document_lists` */

insert  into `document_lists`(`id`,`title`,`category_id`,`sub_category_id`,`updation_date`,`is_active`) values (1,'Repost 1',1,1,'2017-01-06 17:19:48',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `login_histories` */

insert  into `login_histories`(`id`,`login_user_id`,`login_time`,`logout_time`,`ip_address`,`user_agent`,`is_active`) values (76,1,'2017-01-06 13:27:03','2017-01-06 14:08:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(77,1,'2017-01-06 13:29:19','2017-01-06 14:08:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(78,1,'2017-01-06 13:47:09','2017-01-06 14:08:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(79,1,'2017-01-06 13:47:28','2017-01-06 14:08:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(80,1,'2017-01-06 13:48:52','2017-01-06 14:08:26','127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',0),(81,1,'2017-01-06 14:12:45',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',1),(82,1,'2017-01-06 16:20:35',NULL,'127.0.0.1','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',1);

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
  `is_active` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `pdf_reports` */

insert  into `pdf_reports`(`id`,`pdf_name`,`uploading_date`,`document_id`,`is_active`) values (1,'cat1subcat1.pdf','2017-01-06 17:22:32',1,1);

/*Table structure for table `sub_categorys` */

DROP TABLE IF EXISTS `sub_categorys`;

CREATE TABLE `sub_categorys` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sub_category_name` varchar(225) DEFAULT NULL,
  `category_id` int(10) DEFAULT NULL,
  `is_active` int(10) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

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

insert  into `users`(`id`,`name`,`email`,`password`,`remember_token`,`created_at`,`updated_at`,`last_login_time`,`is_active`) values (1,'Abhishek','abhishekgupta00143@gmail.com','$2y$10$0F4Us.bfO64bkodcdSBKlOBItJnA4g9BAp7VutxP0A7o78rDwhOHS','Q2RBDEmkxjtMvMPKsV7jcOgSEKKLsyV3gjkpW5hBt9jrVqClVGBhN99oQREP','2017-01-05 13:58:21','2017-01-06 16:20:35','2017-01-06 16:20:35',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
