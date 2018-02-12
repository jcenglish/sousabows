<?php

require("db-info.php");

define("MAPS_HOST", "maps.googleapis.com");
define("KEY", "AIzaSyAzz2f0ZIinjZL5avlmuREHNiv4fAFieHo");

// Opens a connection to a MySQL server
$connection = mysqli_connect($servername, $username, $password, $dbname);
if (mysqli_connect_errno()) {
    print("Not connected : " . mysqli_connect_error());
    exit();
}

// Set the active MySQL database
$db_selected = mysqli_select_db($connection, $dbname);
if (!$db_selected) {
    die("Can\'t use db : " . mysqli_error($connection));
}

// Select all the rows in the markers table
$query = "SELECT * FROM dealers";

if ($result = mysqli_query($connection, $query)) {
    printf("Select returned %d rows.\n", mysqli_num_rows($result));
} else {
    print("Invalid select query: " . mysqli_error($connection));
    exit();
}

// Initialize delay in geocode speed
$delay = 0;
$base_url = "https://" . MAPS_HOST . "/maps/api/geocode/xml?";

// Iterate through the rows, geocoding each address
while ($row = mysqli_fetch_assoc($result)) {
    $geocode_pending = true;

    while ($geocode_pending) {
        $address = $row["address"] . ', ' . $row["city_municipality"] . ', ' . $row["state_province"];
        $id = $row["id"];
        $request_url = $base_url . "address=" . urlencode($address) . "&key=" . KEY;
        $xml = simplexml_load_file($request_url) or die("url not loading");
        print_r($xml);
        $status = $xml->status;
        if (strcmp($status, "OK") == 0) {
            // successful geocode
            $geocode_pending = false;
//      $coordinates = $xml->GeocodeResponse->Placemark->Point->coordinates;
//      $coordinatesSplit = split(",", $coordinates);
            $lat = $xml->result->geometry->location->lat;
            $lng = $xml->result->geometry->location->lng;
            $place_id = $xml->result->place_id;

            $query = sprintf("UPDATE dealers" .
                    " SET lat='%s', lng='%s', google_place_id='%s'" .
                    " WHERE id='%s' LIMIT 1;", mysqli_real_escape_string($connection, $lat), mysqli_real_escape_string($connection, $lng), mysqli_real_escape_string($connection, $place_id), mysqli_real_escape_string($connection, $id));
            $update_result = mysqli_query($connection, $query);
            if (!$update_result) {
                printf("Invalid update query: " . mysqli_error($connection));
                exit();
            }
        } else if (strcmp($status, "UNKNOWN_ERROR") == 0) {
            // sent geocodes too fast
            $delay += 100000;
        } else {
            // failure to geocode
            $geocode_pending = false;
            echo "Address " . $address . " failed to geocode. ";
            echo "Received status " . $status . "
\n";
        }
        usleep($delay);
    }
}
?>