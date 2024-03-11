CREATE DATABASE appointments_db;

USE appointments_db;

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  birthdate DATE NOT NULL,
  contactnumber VARCHAR(20) NOT NULL,
  homeaddress TEXT NOT NULL,
  purpose TEXT NOT NULL
);
