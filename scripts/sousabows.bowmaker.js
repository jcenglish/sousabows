$(document).ready(function () {
    $instrument = window.location.href.substr(window.location.href.indexOf('=') + 1).replace("+", " ");
    $('#slides').slick(slickSettings);
    setOption();
    $('#slides').on('init', function(event, slick) {
       console.log("slick init"); 
    });
    
        $('#slides').on('reinit', function(event, slick) {
       console.log("slick reinit"); 
    });
});

var slickSettings = {
    appendArrows: $('.carousel'),
    autoplay: false,
    arrows: true,
    prevArrow: "<div class='prev'><span class='icon icon-left-open-big'></span></div>",
    nextArrow: "<div class='next'><span class='icon icon-right-open-big'></span></div>",
    dots: false,
    lazyLoad: 'progressive',
    mobileFirst: true,
    infinite: true,
    respondTo: 'slider',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

//function setSlick(html) {
//    $('#slides').slick('slickRemove', 0);
//    $('#slides').slick('slickAdd', html);
//}

function setOption() {
    var
            $model = $('#bow-maker').find('.model'),
            $fitting = $('#bow-maker').find('.fitting'),
            $this,
            $thisModel = '',
            $thisFitting = '',
            $thisData;
    
    $model.add($fitting).on('click', function () {
        $this = $(this);
        if ($this.hasClass('m_classic')) {
            $thisModel = 'classic';
            $thisData = {"model": "classic", "fitting": $thisFitting, "instrument": $instrument};
            //$('#slides').load('/includes/bow-maker_slides.php', {"model": "classic", "fitting": $thisFitting, "instrument": $instrument}, setSlick());
            $.ajax({
                url: 'includes/bow-maker_slides.php',
                dataType: 'html',
                type: 'POST',
                data: $thisData,
                success: function (html) {
                    $('#slides').slick('unslick');
                    $('#slides').html(html);
                    $('#slides').slick(slickSettings);
                }
            });
        }


        else if ($this.hasClass('m_artisan')) {
            $thisModel = 'artisan';
            $thisData = {"model": "artisan", "fitting": $thisFitting, "instrument": $instrument};
           // $('#slides').load('/includes/bow-maker_slides.php', {"model": "artisan", "fitting": $thisFitting, "instrument": $instrument}, setSlick());
            $.ajax({
                url: 'includes/bow-maker_slides.php',
                dataType: 'html',
                type: 'POST',
                data: $thisData,
                success: function (html) {
                    $('#slides').slick('unslick');
                    $('#slides').html(html);
                    $('#slides').slick(slickSettings);
                }
            });
        }

        else if ($this.hasClass('f_nickel')) {
            $thisFitting = 'nickel';
            $thisData = {"fitting": "nickel", "model": $thisModel, "instrument": $instrument};
            //$('#slides').load('/includes/bow-maker_slides.php', {"fitting": "nickel", "model": $thisModel, "instrument": $instrument}, setSlick());
            
            $.ajax({
                url: 'includes/bow-maker_slides.php',
                dataType: 'html',
                type: 'POST',
                data: $thisData,
                success: function (html) {
                    $('#slides').slick('unslick');
                    $('#slides').html(html);
                    $('#slides').slick(slickSettings);
                }
            });
        }

        else if ($this.hasClass('f_silver')) {
            $thisFitting = 'silver';
            $thisData = {"fitting": "silver", "model": $thisModel, "instrument": $instrument};
            //$('#slides').load('/includes/bow-maker_slides.php', {"fitting": "silver", "model": $thisModel, "instrument": $instrument}, setSlick());
            $.ajax({
                url: 'includes/bow-maker_slides.php',
                dataType: 'html',
                type: 'POST',
                data: $thisData,
                success: function (html) {
                    $('#slides').slick('unslick');
                    $('#slides').html(html);
                    $('#slides').slick(slickSettings);
                    
                }
            });
        }
    });
}