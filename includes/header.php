<!DOCTYPE html>
<html <?php if (isset($htmlType)) {
    echo $htmlType;
} ?> >
    <head>
        <title><?= $pageTitle ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
        <link href='http://fonts.googleapis.com/css?family=Josefin+Sans:300,700|Open+Sans:700,300,400' rel='stylesheet' type='text/css'>
        <?php
        if (isset($pageCss)) {
            echo $pageCss;
        }
        ?>
        <link rel="stylesheet" type="text/css" href="css/style.min.css">
        <link rel="shortcut icon" type="image/x-icon" href="img/favicon.ico" />
        <?php
        if (isset($headJquery) && $headJquery) {
            echo "<script type='text/javascript' src='https://code.jquery.com/jquery-2.1.4.min.js'></script>";
        }
        ?>
        <?php
        if (isset($headJs)) {
            echo $headJs;
        }
        ?>
    </head>
    <body id="<?= 'page_' . basename($_SERVER['PHP_SELF'], '.php') ?>">
        <div class='container'>
            <header>
                <div id='logo'><a href="index.php"><img src='img/logo.png' alt=''></a></div>
                <nav>
                    <div id='nav-level-1'>
                        <a href="index.php" id='logo-small'><img src='img/logo_small.png' alt=''></a><ul class='nav-items'>
                            <li class="slide-line"></li><li class='nav-item has-nav-sub' tabindex='1'><span>Our Bows</span></li><li class='nav-item' tabindex='8'><a href="dealers.php">Our Dealers<span></span></a></li><li class='nav-item' tabindex='7'><a href="contact.php">Contact Us<span></span></a></li>
                        </ul>
                    </div><!--
                    --><div id='nav-level-2'>
                        <ul class='nav-items'>
                            <li class='nav-item' tabindex='2'>
                                <a href='bow.php#instrument=violin'><div class='clip_circle'><img src='img/violin.png' alt=''></div>Violin</a>
                            </li>
                            <li class='nav-item' tabindex='3'>
                                <a href='bow.php#instrument=viola'><div class='clip_circle'><img src='img/viola.png' alt=''></div>Viola</a>
                            </li>
                            <li class='nav-item' tabindex='4'>
                                <a href='bow.php#instrument=cello'><div class='clip_circle'><img src='img/cello.png' alt=''></div>Cello</a>
                            </li>
                            <li class='nav-item' tabindex='5'>
                                <a href='bow.php#instrument=french+bass'><div class='clip_circle'><img src='img/french_bass.png' alt=''></div>French Bass</a>
                            </li>
                            <li class='nav-item' tabindex='6'>
                                <a href='bow.php#instrument=german+bass'><div class='clip_circle'><img src='img/german_bass.png' alt=''></div>German Bass</a>
                            </li>
                            <li class='nav-item'>
                                <a href='our-bows.php#groupby=instrument' tabindex='7'>View All Models</a>
                            </li>
                        </ul>
                    </div>
                    <div id='overlay'></div>
                </nav>
            </header>