-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 11, 2025 at 05:27 PM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u147281161_ka_kha_ga_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `GlobalEmailTemplate`
--

CREATE TABLE `GlobalEmailTemplate` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT 'default',
  `headerHtml` text NOT NULL,
  `footerHtml` text NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `GlobalEmailTemplate`
--

INSERT INTO `GlobalEmailTemplate` (`id`, `name`, `headerHtml`, `footerHtml`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'default', '<div style=\"padding:20px;background:#f5f5f5;\"><img src=\"https://www.developerbowl.com/_next/image?url=%2Fdeveloper_bowl_logo.png&w=384&q=75\" height=\"50\"/></div>', '<div style=\"padding:20px;background:#f5f5f5;text-align:center;\">© 2025 क-ख-ग. All rights reserved.</div>', 1, '2025-11-18 23:31:01.000', '2025-11-18 23:31:01.000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `GlobalEmailTemplate`
--
ALTER TABLE `GlobalEmailTemplate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `GlobalEmailTemplate_name_key` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `GlobalEmailTemplate`
--
ALTER TABLE `GlobalEmailTemplate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
