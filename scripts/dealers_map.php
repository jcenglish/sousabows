<?php

require 'db-info.php';

// Get parameters from URL

if (isset($_GET)) {
    $center_lat = $_GET["lat"];
    $center_lng = $_GET["lng"];
    $radius = $_GET["radius"];
}

// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a mySQL server
$connection = new mysqli($servername, $username, $password, $dbname); // DEPRECATED mysql_connect, use MySQLi
//if (mysqli_connect_errno()) {
//    printf("Connect failed: %s\n", mysqli_connect_error());
//    exit();
//}
// Set the active mySQL database
$db_selected = mysqli_select_db($connection, $dbname);
//if (!$db_selected) {
//    die("Can\'t use db : " . $connection->error());
//}
// Search the rows in the markers table
$query = sprintf("SELECT addressee, lat, lng, phone_main, zipcode_postalcode, address, city_municipality, state_province, CONCAT(address, ', ', city_municipality, ', ', state_province) AS address_full, ( 3959 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM dealers AS markers HAVING distance < '%s' ORDER BY distance LIMIT 0 , 20", $connection->real_escape_string($center_lat), $connection->real_escape_string($center_lng), $connection->real_escape_string($center_lat), $connection->real_escape_string($radius));
$result = mysqli_query($connection, $query);
//if (!$result) {
//    die("Invalid query: " . $connection->error());
//}
header("Content-type: text/xml");
// Iterate through the rows, adding XML nodes for each
while ($row = mysqli_fetch_assoc($result)) {
    $node = $dom->createElement("marker");
    $newnode = $parnode->appendChild($node);
    $newnode->setAttribute("name", $row['addressee']);
    $newnode->setAttribute("address", $row['address_full']);
    $newnode->setAttribute("address_1", $row['address']);
    $newnode->setAttribute("city", $row['city_municipality']);
    $newnode->setAttribute("state", $row['state_province']);
    $newnode->setAttribute("zipcode", $row['zipcode_postalcode']);
    $newnode->setAttribute("phone", $row['phone_main']);
    $newnode->setAttribute("lat", $row['lat']);
    $newnode->setAttribute("lng", $row['lng']);
    $newnode->setAttribute("distance", $row['distance']);
}

echo $dom->saveXML();

mysqli_close($connection);
