<?php
$pageTitle = "Our Bows - Sousa Bows"; //SEO More descriptive title
$pageDesc = "";
$pageCss = "";
$headJquery = true;
$headJs = "<script type='text/javascript' src='vendor/benalman/jquery.ba-bbq.min.js'></script>";
$footJs = "<script type='text/javascript' src='scripts/sousabows.our-bows.min.js'></script>";

include 'includes/header.php';
?>
<main>
    <div class='filter'>
        <ul>
            <li><a href='#groupby=instrument' class=''>By Instrument</a></li><li><a href='#groupby=model' class=''>By Model</a></li><li><a href='#groupby=fitting' class=''>By Fitting</a></li>
        </ul>
    </div>
    <div id='load'></div>
    <div class='view'>
    </div>
</main>
<?php include 'includes/footer.php' ?>