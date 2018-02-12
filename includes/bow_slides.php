
<?php
$numSlides = 6;

if (isset($_POST['instrument']) && isset($_POST['model']) && isset($_POST['fitting'])) {

    $instrument = $_POST['instrument'];
    $model = $_POST['model'];
    $fitting = $_POST['fitting'];
    //$slideNum = $_POST['slideNum'];
}

if (isset($instrument) && isset($model) && isset($fitting)) {
    for ($slideNum = 1; $slideNum <= $numSlides; $slideNum++) {
        $bowImage = "img/bow/" . str_replace(' ', '', strtolower($instrument)) . "_" . str_replace(' ', '', strtolower($model)) . "_" . str_replace(' ', '', strtolower($fitting)) . "_" . $slideNum . ".jpg";
        $fullBowImage = "../" . $bowImage;
        $bowZoom = "img/bow/zoom/" . str_replace(' ', '', strtolower($instrument))
                . '_' . str_replace(' ', '', strtolower($model)) . '_' . str_replace(' ', '', strtolower($fitting)) . '_'
                . $slideNum . ".jpg";
        $lightcase = "data-rel='lightcase'";
        if (!file_exists($fullBowImage)) {
            $bowImage = 'img/image-coming-soon.png';
            echo "<div class='slide'><img data-lazy='" . $bowImage . "' alt=''></div>";
        } else {
            echo "<div class='slide'><a href='" . $bowZoom . "'" . $lightcase . "><img data-lazy='" . $bowImage . "' alt=''></a></div>";
        }
    }
}
?>