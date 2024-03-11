<?php
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


function execute_query($sql) {
    global $conn;
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return "Error: " . $sql . "<br>" . $conn->error;
    }
}

function fetch_appointments() {
    global $conn;
    $sql = "SELECT * FROM appointments";
    $result = $conn->query($sql);
    $appointments = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $appointments[] = $row;
        }
    }
    return $appointments;
}
?>
