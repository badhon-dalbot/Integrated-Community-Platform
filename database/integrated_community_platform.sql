-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2025 at 05:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `integrated_community_platform`
--

-- --------------------------------------------------------

--
-- Table structure for table `buy_sell_item`
--

CREATE TABLE `buy_sell_item` (
  `item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `date_listed` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(150) DEFAULT NULL,
  `status` enum('available','sold') DEFAULT 'available'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `buy_sell_item`
--

INSERT INTO `buy_sell_item` (`item_id`, `user_id`, `item_name`, `description`, `category`, `price`, `photo_url`, `date_listed`, `location`, `status`) VALUES
(1, 1, 'iPhone 12', 'Used iPhone 12 in excellent condition.', 'Electronics', 700.00, 'https://example.com/iphone12.jpg', '2024-12-31 18:00:00', 'Springfield', 'available'),
(2, 2, 'Dining Table', 'Wooden dining table with 6 chairs.', 'Furniture', 150.00, 'https://example.com/dining_table.jpg', '2025-01-01 18:00:00', 'Rivertown', 'sold'),
(3, 3, 'Bicycle', 'Mountain bike with 21-speed gears.', 'Sports', 200.00, 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg', '2025-01-02 18:00:00', 'Hilltop', 'available'),
(4, 4, 'Gaming Laptop', 'High-performance gaming laptop.', 'Electronics', 1200.00, 'https://example.com/gaming_laptop.jpg', '2025-01-03 18:00:00', 'Sunset', 'sold'),
(5, 5, 'Coffee Maker', 'Automatic espresso machine.', 'Appliances', 80.00, 'https://example.com/coffee_maker.jpg', '2025-01-04 18:00:00', 'Downtown', 'available'),
(6, 6, 'Watch', 'Luxury wristwatch with leather strap.', 'Accessories', 300.00, 'https://example.com/watch.jpg', '2025-01-05 18:00:00', 'Tech City', 'available'),
(7, 7, 'Bookshelf', 'Wooden bookshelf with 5 shelves.', 'Furniture', 50.00, 'https://example.com/bookshelf.jpg', '2025-01-06 18:00:00', 'Metropolis', 'sold'),
(8, 8, 'Tablet', 'Apple iPad with Wi-Fi and 64GB storage.', 'Electronics', 350.00, 'https://example.com/ipad.jpg', '2025-01-07 18:00:00', 'Themyscira', 'available'),
(9, 9, 'Leather Jacket', 'Black leather jacket, size M.', 'Clothing', 100.00, 'https://example.com/jacket.jpg', '2025-01-08 18:00:00', 'Gotham', 'available'),
(10, 10, 'Sofa', 'Three-seat sofa with cushions.', 'Furniture', 250.00, 'https://example.com/sofa.jpg', '2025-01-09 18:00:00', 'Red Square', 'sold');

-- --------------------------------------------------------

--
-- Table structure for table `emergency_alert`
--

CREATE TABLE `emergency_alert` (
  `alert_id` int(11) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date_issued` date NOT NULL,
  `time_issued` time NOT NULL,
  `status` enum('active','resolved','archived') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emergency_alert`
--

INSERT INTO `emergency_alert` (`alert_id`, `admin_id`, `title`, `description`, `date_issued`, `time_issued`, `status`) VALUES
(1, 2, 'Severe Weather Warning', 'Heavy rainfall and possible flooding expected.', '2025-01-01', '06:00:00', 'active'),
(2, 3, 'Road Closure', 'Main highway closed due to an accident. Seek alternate routes.', '2025-01-02', '08:30:00', 'active'),
(3, 4, 'Fire Alert', 'Fire in the downtown area. Evacuate immediately.', '2025-01-03', '12:00:00', 'resolved'),
(4, 5, 'Flood Warning', 'Flash flood warning for low-lying areas. Move to higher ground.', '2025-01-04', '16:00:00', 'active'),
(5, 6, 'Tornado Watch', 'Tornadoes possible in the region. Take shelter immediately.', '2025-01-05', '14:00:00', 'archived'),
(6, 7, 'Power Outage', 'Power outage in central district. Crews are working to restore power.', '2025-01-06', '10:30:00', 'resolved'),
(7, 8, 'Earthquake Aftershock', 'Aftershocks expected in the region. Stay alert.', '2025-01-07', '11:45:00', 'active'),
(8, 9, 'Hurricane Warning', 'Hurricane expected to hit within 24 hours. Evacuate if necessary.', '2025-01-08', '07:00:00', 'active'),
(9, 10, 'Heatwave Alert', 'Extremely high temperatures expected. Stay hydrated and indoors.', '2025-01-09', '09:00:00', 'archived');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `organizer_id` int(11) NOT NULL,
  `event_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `street_or_house` varchar(150) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `contact_details` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `organizer_id`, `event_name`, `description`, `date`, `time`, `street_or_house`, `town`, `district`, `division`, `contact_details`) VALUES
(1, 1, 'Springfield Charity Run', 'A charity run for local causes.', '2025-01-01', '08:00:00', '123 Main St', 'Springfield', 'Central', 'East', 'contact@charityrun.com'),
(2, 2, 'Rivertown Music Festival', 'A weekend of live music and food trucks.', '2025-01-02', '15:00:00', '456 River Rd', 'Rivertown', 'South', 'West', 'info@rivertownfestival.com'),
(3, 3, 'Hilltop Art Exhibition', 'An exhibition featuring local artists.', '2025-01-03', '10:00:00', '789 Hilltop Ave', 'Hilltop', 'North', 'East', 'contact@hilltopart.com'),
(4, 4, 'Sunset Yoga Class', 'Outdoor yoga session for all levels.', '2025-01-04', '07:00:00', '321 Sunset Blvd', 'Sunset', 'Central', 'North', 'yoga@sunset.com'),
(5, 5, 'Downtown Food Festival', 'Food trucks offering cuisines from around the world.', '2025-01-05', '12:00:00', '654 Main St', 'Downtown', 'West', 'Central', 'food@downtownfest.com'),
(6, 6, 'Tech City Coding Bootcamp', 'A weekend coding bootcamp for beginners.', '2025-01-06', '09:00:00', '123 Tech Ave', 'Tech City', 'Central', 'East', 'info@techbootcamp.com'),
(7, 7, 'Metropolis Marathon', 'A full marathon across the city streets.', '2025-01-07', '07:30:00', '987 Metropolis Rd', 'Metropolis', 'North', 'East', 'contact@metromarathon.com'),
(8, 8, 'Themyscira Beach Party', 'A fun beach party with music and games.', '2025-01-08', '16:00:00', '101 Beach St', 'Themyscira', 'South', 'West', 'info@beachparty.com'),
(9, 9, 'Gotham Comic Convention', 'A convention for comic book fans.', '2025-01-09', '10:00:00', '456 Gotham Blvd', 'Gotham', 'West', 'North', 'contact@gothamconvention.com'),
(10, 10, 'Red Square Art Walk', 'A guided walk through local art galleries.', '2025-01-10', '18:00:00', '222 Red Square St', 'Red Square', 'East', 'Central', 'art@redsquarewalk.com');

-- --------------------------------------------------------

--
-- Table structure for table `found_item`
--

CREATE TABLE `found_item` (
  `found_item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `contact` varchar(100) NOT NULL,
  `date_found` date NOT NULL,
  `location_found` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `found_item`
--

INSERT INTO `found_item` (`found_item_id`, `user_id`, `item_name`, `description`, `photo_url`, `contact`, `date_found`, `location_found`) VALUES
(1, 1, 'Phone', 'Samsung Galaxy S21 with a black case.', 'https://images.pexels.com/photos/1194760/pexels-photo-1194760.jpeg', '1234567890', '2025-01-01', 'Central Park'),
(2, 2, 'Wallet', 'Brown leather wallet with cash inside.', 'https://images.pexels.com/photos/915915/pexels-photo-915915.jpeg', '9876543210', '2025-01-02', 'Rivertown Mall'),
(3, 3, 'Keys', 'Car keys with a blue keychain.', 'https://images.pexels.com/photos/333837/pexels-photo-333837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '5556667777', '2025-01-03', 'Tech City Plaza'),
(4, 4, 'Ring', 'Diamond engagement ring.', 'https://example.com/ring_found.jpg', '4445556666', '2025-01-04', 'Metropolis Train Station'),
(5, 5, 'Backpack', 'Blue backpack with a laptop inside.', 'https://example.com/backpack_found.jpg', '1112223333', '2025-01-05', 'Sunset Park'),
(6, 6, 'Bike', 'Black BMX bike.', 'https://example.com/bike_found.jpg', '8889990000', '2025-01-06', 'Downtown Skate Park'),
(7, 7, 'Glasses', 'Black-rimmed glasses.', 'https://example.com/glasses_found.jpg', '3334445555', '2025-01-07', 'Hilltop Library'),
(8, 8, 'Watch', 'Smartwatch with a blue strap.', 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', '6667778888', '2025-01-08', 'Gotham Square'),
(9, 9, 'Laptop', 'MacBook Pro with a silver case.', 'https://example.com/laptop_found.jpg', '7778889999', '2025-01-09', 'Themyscira Cafe'),
(10, 10, 'Passport', 'UK passport.', 'https://example.com/passport_found.jpg', '9998887777', '2025-01-10', 'Red Square Airport');

-- --------------------------------------------------------

--
-- Table structure for table `lost_item`
--

CREATE TABLE `lost_item` (
  `lost_item_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `contact` varchar(100) NOT NULL,
  `date_lost` date NOT NULL,
  `location_lost` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lost_item`
--

INSERT INTO `lost_item` (`lost_item_id`, `user_id`, `item_name`, `description`, `photo_url`, `contact`, `date_lost`, `location_lost`) VALUES
(1, 1, 'Wallet', 'Black leather wallet with credit cards and ID.', 'https://images.pexels.com/photos/915915/pexels-photo-915915.jpeg', '1234567890', '2025-01-01', 'Springfield Park'),
(2, 2, 'Phone', 'iPhone 13 in a blue case.', 'https://example.com/phone.jpg', '9876543210', '2025-01-02', 'Central Mall'),
(3, 3, 'Laptop', 'Dell XPS 13 with stickers on the cover.', 'https://example.com/laptop.jpg', '5556667777', '2025-01-03', 'Hilltop Cafe'),
(4, 4, 'Backpack', 'Black backpack with school supplies.', 'https://example.com/backpack.jpg', '4445556666', '2025-01-04', 'Sunset Library'),
(5, 5, 'Glasses', 'Brown-rimmed prescription glasses.', 'https://example.com/glasses.jpg', '1112223333', '2025-01-05', 'Downtown Office'),
(6, 6, 'Keys', 'Set of house keys with a red keychain.', 'https://example.com/keys.jpg', '8889990000', '2025-01-06', 'Tech City Building'),
(7, 7, 'Watch', 'Silver Rolex watch.', 'https://example.com/watch.jpg', '3334445555', '2025-01-07', 'Metropolis Gym'),
(8, 8, 'Ring', 'Gold wedding ring with an inscription.', 'https://example.com/ring.jpg', '6667778888', '2025-01-08', 'Themyscira Beach'),
(9, 9, 'Bike', 'Red mountain bike.', 'https://example.com/bike.jpg', '7778889999', '2025-01-09', 'Gotham Park'),
(10, 10, 'Passport', 'US passport.', 'https://example.com/passport.jpg', '9998887777', '2025-01-10', 'Red Square Hotel');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `review_id` int(11) NOT NULL,
  `service_provider_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rating` decimal(3,2) DEFAULT NULL CHECK (`rating` between 0 and 5),
  `comments` text DEFAULT NULL,
  `date_reviewed` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `service_provider_id`, `user_id`, `rating`, `comments`, `date_reviewed`) VALUES
(1, 1, 1, 5.00, 'Excellent ambulance service, quick response!', '2024-12-31 18:00:00'),
(2, 2, 2, 4.00, 'Police were professional but response time could improve.', '2025-01-01 18:00:00'),
(3, 3, 3, 4.50, 'Fire department arrived quickly and handled the situation well.', '2025-01-02 18:00:00'),
(4, 4, 4, 4.80, 'Great hospital, friendly staff and good care.', '2025-01-03 18:00:00'),
(5, 5, 5, 5.00, 'Rescue service was prompt and efficient, highly recommend!', '2025-01-04 18:00:00'),
(6, 6, 6, 4.60, 'Police were helpful and resolved the issue swiftly.', '2025-01-05 18:00:00'),
(7, 7, 7, 4.90, 'Ambulance arrived within minutes, very professional staff.', '2025-01-06 18:00:00'),
(8, 8, 8, 5.00, 'Fire department was outstanding in handling the fire emergency.', '2025-01-07 18:00:00'),
(9, 9, 9, 4.80, 'Rescue team was fast and took great care of the situation.', '2025-01-08 18:00:00'),
(10, 10, 10, 4.70, 'Hospital staff were excellent but wait times could be better.', '2025-01-09 18:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `service_provider`
--

CREATE TABLE `service_provider` (
  `service_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `service_type` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `ratings` decimal(3,2) DEFAULT NULL CHECK (`ratings` between 0 and 5),
  `review_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_provider`
--

INSERT INTO `service_provider` (`service_id`, `name`, `service_type`, `contact`, `ratings`, `review_count`) VALUES
(1, 'City Ambulance', 'ambulance', '123-456-7890', 4.80, 120),
(2, 'Downtown Police', 'police', '234-567-8901', 4.50, 200),
(3, 'Sunset Fire Department', 'fire', '345-678-9012', 4.90, 80),
(4, 'Red Cross Hospital', 'hospital', '456-789-0123', 4.70, 150),
(5, 'Tech Rescue', 'rescue', '567-890-1234', 5.00, 50),
(6, 'City Police', 'police', '678-901-2345', 4.60, 180),
(7, 'Central Ambulance', 'ambulance', '789-012-3456', 4.80, 110),
(8, 'Westside Fire Dept', 'fire', '890-123-4567', 4.90, 90),
(9, 'Blue Lake Rescue', 'rescue', '901-234-5678', 4.70, 70),
(10, 'Mountainview Hospital', 'hospital', '012-345-6789', 4.60, 130);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(15) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `division` varchar(100) DEFAULT NULL,
  `role` enum('member','admin') DEFAULT 'member',
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `name`, `email`, `password`, `phonenumber`, `city`, `district`, `division`, `role`, `time`) VALUES
(1, 'john_doe', 'John Doe', 'john@example.com', 'hashed_password1', '1234567890', 'Springfield', 'Central', 'East', 'member', '2025-01-04 16:16:09'),
(2, 'jane_doe', 'Jane Doe', 'jane@example.com', 'hashed_password2', '9876543210', 'Rivertown', 'South', 'West', 'admin', '2025-01-04 16:16:09'),
(3, 'mark_smith', 'Mark Smith', 'mark@example.com', 'hashed_password3', '5556667777', 'Hilltop', 'North', 'East', 'member', '2025-01-04 16:16:09'),
(4, 'emily_jones', 'Emily Jones', 'emily@example.com', 'hashed_password4', '4445556666', 'Sunset', 'Central', 'North', 'member', '2025-01-04 16:16:09'),
(5, 'peter_parker', 'Peter Parker', 'peter@example.com', 'hashed_password5', '1112223333', 'Downtown', 'West', 'Central', 'member', '2025-01-04 16:16:09'),
(6, 'tony_stark', 'Tony Stark', 'tony@gmail.com', '1234qwer', '12345678', 'Badda', 'Dhaka', 'Dhaka', 'admin', '2025-01-04 16:16:09'),
(7, 'clark_kent', 'Clark Kent', 'clark@example.com', 'hashed_password7', '3334445555', 'Metropolis', 'North', 'East', 'member', '2025-01-04 16:16:09'),
(8, 'diana_prince', 'Diana Prince', 'diana@example.com', 'hashed_password8', '6667778888', 'Themyscira', 'South', 'West', 'member', '2025-01-04 16:16:09'),
(9, 'bruce_wayne', 'Bruce Wayne', 'bruce@example.com', 'hashed_password9', '7778889999', 'Gotham', 'West', 'North', 'admin', '2025-01-04 16:16:09'),
(10, 'natasha_romanoff', 'Natasha Romanoff', 'natasha@example.com', 'hashed_password10', '9998887777', 'Red Square', 'East', 'Central', 'member', '2025-01-04 16:16:09');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `buy_sell_item`
--
ALTER TABLE `buy_sell_item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `fk_buy_sell_item` (`user_id`);

--
-- Indexes for table `emergency_alert`
--
ALTER TABLE `emergency_alert`
  ADD PRIMARY KEY (`alert_id`),
  ADD KEY `fk_emergency_alert` (`admin_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `fk_event` (`organizer_id`);

--
-- Indexes for table `found_item`
--
ALTER TABLE `found_item`
  ADD PRIMARY KEY (`found_item_id`),
  ADD KEY `fk_found_item` (`user_id`);

--
-- Indexes for table `lost_item`
--
ALTER TABLE `lost_item`
  ADD PRIMARY KEY (`lost_item_id`),
  ADD KEY `fk_lost_item` (`user_id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `fk_review_1` (`service_provider_id`),
  ADD KEY `fk_review_2` (`user_id`);

--
-- Indexes for table `service_provider`
--
ALTER TABLE `service_provider`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `buy_sell_item`
--
ALTER TABLE `buy_sell_item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `emergency_alert`
--
ALTER TABLE `emergency_alert`
  MODIFY `alert_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `found_item`
--
ALTER TABLE `found_item`
  MODIFY `found_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `lost_item`
--
ALTER TABLE `lost_item`
  MODIFY `lost_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `service_provider`
--
ALTER TABLE `service_provider`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `buy_sell_item`
--
ALTER TABLE `buy_sell_item`
  ADD CONSTRAINT `fk_buy_sell_item` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `emergency_alert`
--
ALTER TABLE `emergency_alert`
  ADD CONSTRAINT `fk_emergency_alert` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `fk_event` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `found_item`
--
ALTER TABLE `found_item`
  ADD CONSTRAINT `fk_found_item` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `lost_item`
--
ALTER TABLE `lost_item`
  ADD CONSTRAINT `fk_lost_item` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `fk_review_1` FOREIGN KEY (`service_provider_id`) REFERENCES `service_provider` (`service_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_review_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
