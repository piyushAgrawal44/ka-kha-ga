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
-- Table structure for table `EmailTemplate`
--

CREATE TABLE `EmailTemplate` (
  `id` int(11) NOT NULL,
  `templateName` varchar(100) NOT NULL,
  `templateType` enum('PARENT_INVITE','PARTNER_WELCOME','PARENT_WELCOME','PASSWORD_RESET','MILESTONE_NOTIFICATION','SESSION_REMINDER','DEFAULT') NOT NULL,
  `subject` varchar(255) NOT NULL,
  `bodyHtml` text NOT NULL,
  `bodyText` text DEFAULT NULL,
  `variables` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`variables`)),
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `EmailTemplate`
--

INSERT INTO `EmailTemplate` (`id`, `templateName`, `templateType`, `subject`, `bodyHtml`, `bodyText`, `variables`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'parent_invite_template', 'PARENT_INVITE', 'You Have Been Invited to Join as a Parent', '<p>Hello __NAME__,</p><p>You are invited by __PARTNER_NAME__ to join our platform.</p><p>Click below to accept:</p><a href=\"__INVITE_LINK__\">Accept Invitation</a>', 'Hello __NAME__, You are invited by __PARTNER_NAME__. Visit __INVITE_LINK__', '[\"__NAME__\", \"__PARTNER_NAME__\", \"__INVITE_LINK__\"]', 1, '2025-11-18 23:30:40.000', '2025-11-18 23:30:40.000'),
(3, 'password_reset_template', 'PASSWORD_RESET', 'Reset Your Password', '<p>Hello __NAME__,</p><p>Click the link below to reset your password:</p><a href=\"__RESET_LINK__\">Reset Password</a>', 'Hello __NAME__, click here to reset your password: __RESET_LINK__', '[\"__NAME__\", \"__RESET_LINK__\"]', 1, '2025-11-18 23:31:34.000', '2025-11-18 23:31:34.000'),
(4, 'parent_welcome_template', 'PARENT_WELCOME', 'Welcome to Our Platform, __NAME__!', '<h2>Hello __NAME__!</h2><p>Your parent profile is now active. Start exploring the platform!</p>', 'Hello __NAME__! Your parent profile is active.', '[\"__NAME__\"]', 1, '2025-11-18 23:31:44.000', '2025-11-18 23:31:44.000'),
(5, 'partner_welcome_template', 'PARTNER_WELCOME', 'Welcome to Our Platform, __NAME__!', '<h2>Welcome __NAME__!</h2><p>Your partner account has been successfully created.</p><p>You can now log in using your email.</p>', 'Welcome __NAME__! Your partner account is ready.', '[\"__NAME__\"]', 1, '2025-11-18 23:31:54.000', '2025-11-18 23:31:54.000'),
(6, 'milestone_notification_template', 'MILESTONE_NOTIFICATION', 'Milestone Update for __NAME__', '<h3>Milestone Reached!</h3><p>Dear __NAME__,</p><p>Your child has reached a new milestone: <b>__MILESTONE_NAME__</b>.</p>', 'Milestone reached: __MILESTONE_NAME__ for __NAME__.', '[\"__NAME__\", \"__MILESTONE_NAME__\"]', 1, '2025-11-18 23:32:04.000', '2025-11-18 23:32:04.000'),
(7, 'session_reminder_template', 'SESSION_REMINDER', 'Reminder: Upcoming Session', '<p>Hello __NAME__,</p><p>This is a reminder for your upcoming session on <b>__DATE__</b> at <b>__TIME__</b>.</p>', 'Your session is on __DATE__ at __TIME__.', '[\"__NAME__\", \"__DATE__\", \"__TIME__\"]', 1, '2025-11-18 23:32:14.000', '2025-11-18 23:32:14.000'),
(8, 'default_email_template', 'DEFAULT', 'Notification from Our Platform', '<p>Hello __NAME__,</p><p>This is a default system notification.</p>', 'Hello __NAME__, this is a system notification.', '[\"__NAME__\"]', 1, '2025-11-18 23:32:24.000', '2025-11-18 23:32:24.000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `EmailTemplate`
--
ALTER TABLE `EmailTemplate`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `EmailTemplate_templateName_key` (`templateName`),
  ADD UNIQUE KEY `EmailTemplate_templateType_key` (`templateType`),
  ADD KEY `EmailTemplate_templateType_idx` (`templateType`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `EmailTemplate`
--
ALTER TABLE `EmailTemplate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
