<?php

//clearstatcache();

$groupby = isset($_POST['groupby']) ? $_POST['groupby'] : '';
$mapInstruments = array("violin", "viola", "cello", "french bass", "german bass");
$mapModels = array("Classic", "Artisan", "Master Artisan");
$mapFittings = array("Nickel-Silver", "Silver", "Gold");

$fileRoot = "";

switch ($groupby) {
    case "model":
        for ($m = 0; $m < count($mapModels); $m++) {
//print row of bows grouped by model
            echo "<div class='row'>" .
            "<h1>$mapModels[$m]</h1>";
//print each bow, sorted by instrument and then fitting
            for ($i = 0; $i < count($mapInstruments); $i++) {
                for ($f = 0; $f < count($mapFittings); $f++) {
                    if (!($mapModels[$m] == "master artisan" && $mapFittings[$f] == "nickel-silver")) {
                        $bowImage = str_replace(' ', '', $mapInstruments[$i]) . "_" . str_replace(' ', '', $mapModels[$m]) . "_" . str_replace(' ', '', $mapFittings[$f]) . ".png";
                        $fullBowImage = $fileRoot . $bowImage;
                        if (!file_exists($fullBowImage)) {
                            $bowImage = 'img/thumb_image-coming-soon.png';
                        }
                        $bow = "<div class='bow'>" .
                                "<a href='bow.php#instrument=$mapInstruments[$i]&amp;model=$mapModels[$m]&amp;fitting=$mapFittings[$f]'>" .
                                "<img src='$bowImage' alt=''>" .
                                "<span><span>$mapInstruments[$i]</span><span>$mapModels[$m]</span><span>$mapFittings[$f]</span></span></a></div>";
                        echo $bow;
                    }
                }
            }
            echo "</div>";
        }
        break;
    case "fitting":
        for ($f = 0; $f < count($mapFittings); $f++) {
//print row of bows grouped by fitting
            echo "<div class='row'>" .
            "<h1>$mapFittings[$f]</h1>";
//print each bow, sorted by model and then instrument
            for ($m = 0; $m < count($mapModels); $m++) {
                for ($i = 0; $i < count($mapInstruments); $i++) {
                    if (!($mapModels[$m] == "master artisan" && $mapFittings[$f] == "nickel-silver")) {
                        $bowImage = str_replace(' ', '', $mapInstruments[$i]) . "_" . str_replace(' ', '', $mapModels[$m]) . "_" . str_replace(' ', '', $mapFittings[$f]) . ".png";
                        $fullBowImage = $fileRoot . $bowImage;
                        if (!file_exists($fullBowImage)) {
                            $bowImage = 'img/thumb_image-coming-soon.png';
                        }
                        $bow = "<div class='bow'>" .
                                "<a href='bow.php#instrument=$mapInstruments[$i]&amp;model=$mapModels[$m]&amp;fitting=$mapFittings[$f]'>" .
                                "<img src='$bowImage' alt=''>" .
                                "<span><span>$mapInstruments[$i]</span><span>$mapModels[$m]</span><span>$mapFittings[$f]</span></span></a></div>";
                        echo $bow;
                    }
                }
            }
            echo "</div>";
        }
        break;
    case "instrument":
    default:
        for ($i = 0; $i < count($mapInstruments); $i++) {
            //print row of bows grouped by instrument
            echo "<div class='row'>" .
            "<h1>$mapInstruments[$i]</h1>";
            //print each bow, sorted by model and then fitting
            for ($m = 0; $m < count($mapModels); $m++) {
                for ($f = 0; $f < count($mapFittings); $f++) {
                    if (!($mapModels[$m] == "master artisan" && $mapFittings[$f] == "nickel-silver")) {
                        $bowImage = str_replace(' ', '', $mapInstruments[$i]) . "_" . str_replace(' ', '', $mapModels[$m]) . "_" . str_replace(' ', '', $mapFittings[$f]) . ".png";
                        $fullBowImage = $fileRoot . $bowImage;
                        if (!file_exists($fullBowImage)) {
                            $bowImage = 'img/thumb_image-coming-soon.png';
                        }
                        $bow = "<div class='bow'>" .
                                "<a href='bow.php#instrument=$mapInstruments[$i]&amp;model=$mapModels[$m]&amp;fitting=$mapFittings[$f]'>" .
                                "<img src='$bowImage' alt=''>" .
                                "<span><span>$mapInstruments[$i]</span><span>$mapModels[$m]</span><span>$mapFittings[$f]</span></span></a></div>";
                        echo $bow;
                    }
                }
            }
            echo "</div>";
        }
        break;
}

echo $fileRoot;
?>