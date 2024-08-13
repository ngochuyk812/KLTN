-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 01, 2024 at 04:05 PM
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
(16, 'Michael Riven', '0', 'hau123@gmail.com', '979574301', '2024-07-29', 13800);

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
(0, 16, 1, 16);

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
(1, 1, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173221/trkybi24g177dkayhmzd.jpg', 4600, 'Bisconni Chocolate Chip Cookies 46.8gm'),
(2, 2, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173244/jhdqo2fp8qw7caiixs8p.jpg', 12000, 'Coca Cola Can 250ml'),
(3, 3, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173267/hetpjb3iim62koz8tliw.jpg', 14000, 'Colgate Maximum Cavity Protection 75gm'),
(4, 4, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173385/jak8rumvjgw9cnned8tn.jpg', 12000, 'Fanta 500ml'),
(5, 5, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173407/czjwemcbtanq2ualgdd0.jpg', 14000, 'Fresher Guava Nectar 500ml'),
(6, 6, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173430/dvfepmucdo8duzhq7nk2.jpg', 6000, 'Fruita Vitals Red Grapes 200ml'),
(7, 7, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173611/vc0tumkzgzlyzgys1urx.jpg', 35000, 'Islamabad Tea 238gm'),
(8, 8, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173646/j2l9320v1gp1aou5a3ex.jpg', 2300, 'Kolson Slanty Jalapeno 18gm'),
(9, 9, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173685/wvgtoku8wslnayv7ag1w.jpg', 6900, 'Kurkure Chutney Chaska 62gm'),
(10, 10, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173703/zhrqidtzrhkgfzxnjco6.jpg', 2300, 'LU Candi Biscuit 60gm'),
(11, 11, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173723/gxr0zyjueh0jc672saav.jpg', 2000, 'LU Oreo Biscuit 19gm'),
(12, 12, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173742/qpgmcmnhu6dow45yzt5n.jpg', 2500, 'LU Prince Biscuit 55.2gm'),
(13, 13, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173762/qtv1pmrluzaaa9iyjjk3.jpg', 4600, 'Lays Masala 34gm '),
(14, 14, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173781/ijlgwhzxubaqhahjft4c.jpg', 4600, 'Lays Wavy Mexican Chili 34gm'),
(15, 15, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173799/n0mwmlo60bms28lqfo95.jpg', 9200, 'Lifebuoy Total Protect Soap 96gm'),
(16, 16, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173816/cu3jn997l4cntncgqh87.jpg', 13800, 'aLipton Yellow Label Tea 95gm'),
(17, 17, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173836/zmvuikqtcl8kfwrejzzm.jpg', 27600, 'Meezan Ultra Rich Tea 190gm'),
(18, 18, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173855/x3bkhsmop4vlajluri5j.jpg', 1150, 'Peek Freans Sooper Biscuit 13.2gm'),
(19, 19, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173875/u33vfpeq2l57tgjqnstf.jpg', 11500, 'Safeguard Bar Soap Pure White 175gm'),
(20, 20, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173897/thkauom5umdq5mgy6qiz.jpg', 5750, 'Shezan Apple 250m'),
(21, 21, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173913/zklymvl0lbn686apzrwr.jpg', 23000, 'Sunsilk Shampoo Soft - Smooth 160ml'),
(22, 22, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173929/x5mm9pkuo9uvclf8dsfm.jpg', 2300, 'Super Crisp BBQ 30gm'),
(23, 23, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173967/o3icvokqct29jgva5fzm.jpg', 13800, 'Supreme Tea 95gm'),
(24, 24, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721173989/peupchfahnfyxrqja9sf.jpg', 14000, 'Tapal Danedar 95gm'),
(25, 25, 'http://res.cloudinary.com/dvgjegefi/image/upload/v1721174006/wt8mbilyupcmgqfu4qw2.jpg', 35000, 'Vaseline Healthy White Lotion 100ml');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
