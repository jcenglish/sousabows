<?php

require 'scripts/db-info.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//echo "Connected successfully<br>"; //DEBUG

$sql = 'SELECT state_full, city_municipality FROM dealers ORDER BY state_full, city_municipality';
$result = $conn->query($sql);

$states = array();

// TODO incorporate into DB, I think... ARGH I SORTED THE ABBR BY ABC ORDER, NOT THE FULL STATES ARGH ARGH
$fullStates = array(
    'AL' => 'Alabama',
    'AK' => 'Alaska',
    'AZ' => 'Arizona',
    'AR' => 'Arkansas',
    'CA' => 'California',
    'CO' => 'Colorado',
    'CT' => 'Connecticut',
    'DE' => 'Delaware',
    'DC' => 'District of Columbia',
    'FL' => 'Florida',
    'GA' => 'Georgia',
    'HI' => 'Hawaii',
    'ID' => 'Idaho',
    'IL' => 'Illinois',
    'IN' => 'Indiana',
    'IA' => 'Iowa',
    'KS' => 'Kansas',
    'KY' => 'Kentucky',
    'LA' => 'Louisiana',
    'ME' => 'Maine',
    'MD' => 'Maryland',
    'MA' => 'Massachusetts',
    'MI' => 'Michigan',
    'MN' => 'Minnesota',
    'MS' => 'Mississippi',
    'MO' => 'Missouri',
    'MT' => 'Montana',
    'NE' => 'Nebraska',
    'NV' => 'Nevada',
    'NH' => 'New Hampshire',
    'NJ' => 'New Jersey',
    'NM' => 'New Mexico',
    'NY' => 'New York',
    'NC' => 'North Carolina',
    'ND' => 'North Dakota',
    'OH' => 'Ohio',
    'OK' => 'Oklahoma',
    'OR' => 'Oregon',
    'PA' => 'Pennsylvania',
    'RI' => 'Rhode Island',
    'SC' => 'South Carolina',
    'SD' => 'South Dakota',
    'TN' => 'Tennessee',
    'TX' => 'Texas',
    'UT' => 'Utah',
    'VT' => 'Vermont',
    'VA' => 'Virginia',
    'WA' => 'Washington',
    'WV' => 'West Virginia',
    'WI' => 'Wisconsin',
    'WY' => 'Wyoming',
);

// http://stackoverflow.com/questions/7282522/grouping-cities-states-and-countries-in-mysql-php
// fetch results and build multidimensional array of city counts
while ($row = mysqli_fetch_assoc($result)) {
    if (isset($states[$row['state_full']][$row['city_municipality']])) {
        $states[$row['state_full']][$row['city_municipality']] += 1;
    } else {
        $states[$row['state_full']][$row['city_municipality']] = 1;
    }
}

$stateCounter = 0;
$cityCounter = 0;
// TODO not really ideal, with the parenthesis where they are...
echo "<div class='dir_column'>";

foreach ($states as $state => $cities) {
    if ($stateCounter >= 4 || $cityCounter >= 19) {
        echo "</div>";
        echo "<div class='dir_column'>";
        $stateCounter = 0;
        $cityCounter = 0;
    }
    $stateCounter++;
    
    echo "<div class='dir_state' data-state='" . $state . "'>";
    echo '<h2>' . $state . '</h2>'; // output state start
    $cityCounts = array();
    foreach ($cities as $city => $count) {
        if ($count > 1) {
            $cityCounts[] = $city . ' (' . $count . ')'; // add all city counts to array
        } else {
            $cityCounts[] = $city;
        }
    }

    // implode all city counts and output it
    foreach ($cityCounts as $cityCount) {
        $cityCounter++;
        echo "<a href='#' class='dir_city' data-city='" . preg_replace('/ \(\d*\)/', '', $cityCount) . "'>" . $cityCount . "</a>";
    }

    // output end of state div
    echo "</div>";
}

$conn->close();
?>