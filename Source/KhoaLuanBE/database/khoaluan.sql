-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 17, 2024 at 05:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `khoaluan`
--

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `address` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(11) NOT NULL,
  `order_date` date NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `customer_name`, `address`, `email`, `phone_number`, `order_date`, `total`) VALUES
(1, 'John Doe', '123', 'john.doe@example.com', '123456789', '2024-07-29', 150),
(2, 'John Doe', '123', 'john.doe@example.com', '123456789', '2024-07-29', 150),
(3, 'John Doe', '123', 'john.doe@example.com', '123456789', '2024-07-29', 150),
(4, 'John Doe', '123', 'john.doe@example.com', '123456789', '2024-07-29', 150),
(5, 'John Doe', '123', 'john.doe@example.com', '123456789', '2024-07-29', 150),
(6, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 8600),
(7, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 27600),
(8, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 27600),
(9, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 27600),
(10, 'Michael Riven', '0', 'hau12344@gmail.com', '979574301', '2024-07-29', 13800),
(11, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 13800),
(12, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 13800),
(13, 'Michael Riven', '0', 'hau12344@gmail.com', '1231231', '2024-07-29', 13800),
(14, 'asda asd', '0', 'hau123@gmail.com', '1231231', '2024-07-29', 13800),
(15, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 70000),
(16, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 13800),
(17, 'Nguyễn Ngọc Huy', 'Hồ Chí minh', 'ngohuy@gmail.com', '343242342', '2024-08-17', 146000);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`id`, `product_id`, `quantity`, `order_id`) VALUES
(0, 1, 2, 3),
(0, 2, 1, 3),
(0, 1, 2, 4),
(0, 2, 1, 4),
(0, 1, 2, 5),
(0, 2, 1, 5),
(0, 11, 2, 6),
(0, 1, 1, 6),
(0, 16, 2, 7),
(0, 16, 2, 8),
(0, 16, 2, 9),
(0, 16, 1, 10),
(0, 16, 1, 11),
(0, 16, 1, 12),
(0, 16, 1, 13),
(0, 16, 1, 14),
(0, 7, 2, 15),
(0, 16, 1, 16),
(0, 55, 4, 17),
(0, 57, 2, 17),
(0, 54, 3, 17),
(0, 56, 1, 17),
(0, 58, 1, 17),
(0, 59, 1, 17);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `image` varchar(500) NOT NULL,
  `price` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `label_id`, `image`, `price`, `product_name`) VALUES
(54, 1, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1723906502/ycu8dy8gdrdbmmymff87.jpg', 10000, 'Coca Cola'),
(55, 0, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1723906796/dh4wqtjdimtnhznok0ui.jpg', 7000, 'Lays Blue'),
(56, 2, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1723906834/e08sktkni2tiose3oez5.jpg', 35000, 'Colagate'),
(57, 3, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1723906854/xghpyd04c9ufsjbtc6op.jpg', 9000, 'Fanta'),
(58, 4, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1723906879/kxu81zotjilczvmdpwta.jpg', 25000, 'Laybuoy'),
(59, 8, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1723906902/cfqrnwuo9pnmksd9ppgp.jpg', 10000, 'Nước Yến');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
