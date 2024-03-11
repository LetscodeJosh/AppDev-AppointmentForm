<?php
include_once "db_access.php";

$appointments = fetch_appointments();
echo json_encode($appointments);
?>