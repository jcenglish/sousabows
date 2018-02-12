
<?php

$numSlides = 6;

if (isset($_POST['instrument']) && isset($_POST['model']) && isset($_POST['fitting'])) {

    $instrument = $_POST['instrument'];
    $model = $_POST['model'];
    $fitting = $_POST['fitting'];
}

if (isset($instrument) && isset($model) && isset($fitting)) {
    for ($slideNum = 1; $slideNum <= $numSlides; $slideNum++) {
        echo "<div class='slide'><img src='img/bow/" . str_replace(' ', '', $instrument)
        . '_' . str_replace(' ', '', $model) . '_' . str_replace(' ', '', $fitting) . '_'
        . $slideNum . ".jpg'></div>";
    }
}
?>