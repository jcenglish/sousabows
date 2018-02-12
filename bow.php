<?php
$pageTitle = "Our Bows - Sousa Bows"; //SEO More descriptive title
$pageCss = "<link rel='stylesheet' type='text/css' href='//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.css'/>"
        . "<link href='vendor/cbopp-art/lightcase/lightcase.css' rel='stylesheet'>";
$headJquery = true;
$headJs = "<script type='text/javascript' src='vendor/benalman/jquery.ba-bbq.min.js'></script>";
$footJs = "<script type='text/javascript' src='vendor/cbopp-art/lightcase/lightcase.min.js'></script>"
        ."<script type='text/javascript' src='//cdn.jsdelivr.net/jquery.slick/1.5.8/slick.min.js'></script>"
        . "<script type='text/javascript' src='scripts/sousabows.bow.min.js'></script>"
?>
<?php include 'includes/header.php'; ?>
<main>
    <section id='bow'>
        <h1 class='instrument'></h1>
        <ul class='models' id='models'>
            <li class='model m_classic bbq'><a href='#model=classic'>Classic</a></li>
            <li class='model m_artisan bbq'><a href='#model=artisan'>Artisan</a></li>
            <li class='model m_martisan bbq'><a href='#model=master+artisan'>Master Artisan</a></li>
        </ul>
        <div class='carousel'>
            <div class='prev'><span class='icon icon-left-open-big'></span></div>
            <!-- --><div class='slides' id='slides'>
                <?php include 'includes/bow_slides.php' ?>
            </div><!-- -->
            <div class='next'><span class='icon icon-right-open-big'></span></div>
        </div>

        <ul class = 'fittings' id='fittings'>
            <li class='fitting f_nickel bbq'><a href='#fitting=nickel-silver'></a></li>
            <li class='fitting f_silver bbq'><a href='#fitting=silver'></a></li>
            <li class='fitting f_gold bbq'><a href='#fitting=gold'></a></li>
        </ul>

        <div class='description'>

        </div>
        <div class='map'>
            <a href='dealers.php' class='button'><img src="img/icon_place.png" alt=""><span>Find a Dealer</span></a>
        </div>
    </section>
</main>
<?php include 'includes/footer.php' ?>