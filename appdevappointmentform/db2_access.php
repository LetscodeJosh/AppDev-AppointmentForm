<?php

// Replace with your database connection details
$servername = "localhost:3307";
$username = "";
$password = "";
$dbname = "appointments_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Get appointment ID from URL parameter
$appointmentId = $_GET["appointmentId"];

// SQL query to fetch appointment data
$sql = "SELECT * FROM appointments WHERE id = $appointmentId";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  $appointmentData = $result->fetch_assoc();
  echo json_encode($appointmentData);
} else {
  echo "No appointment found";
}

$conn->close();
