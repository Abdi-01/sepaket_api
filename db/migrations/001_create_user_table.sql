CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(45) DEFAULT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `handphone` varchar(45) DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `photo` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;