<?php
$pageTitle = "Our Dealers - Sousa Bows"; //SEO More descriptive title
$pageDesc = "";
$pageCss = "";
$headJquery = true;
$headJs = "";
$footJs = "<script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyC0TJnvJxHGuyCWLxBHkzA89sfWOfc0nW4'></script>"
        . "<script src='scripts/sousabows.dealers.min.js'></script>";

include 'includes/header.php';
?>
<main>
    <div id="dealers" class='hidden'>
        <img src='img/close.png' alt='' class='action_close'>
        <div></div>
    </div>
    <?php include 'includes/map.php' ?>

    <div id='directory'>
        <h1 class='dir_country'><span>United States Directory</span></h1>
        <div class='dir_locations'>
            <?php include 'includes/dealers_directory.php'; ?>
        </div>

    </div>
</main>
<?php include 'includes/footer.php'; ?>