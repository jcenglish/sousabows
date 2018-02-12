$(document).ready(function () {
    $('#slides').slick(slickSettings);
    setOption();
    $('a[data-rel^=lightcase]').lightcase(lightcaseSettings);
});

var option;
var options;

var lightcaseSettings = {
    disableShrink: true,
    maxWidth: 1818,
    forceWidth: true,
    liveResize: true,
    transition: 'fade',
    overlayOpacity: 1
};


var slickSettings = {
    adaptiveHeight: false,
    //appendArrows: $('.carousel'),
    arrows: true,
    autoplay: false,
    cssEase: 'ease',
    dots: false,
    fade: true,
    infinite: true,
    initialSlide: getCurrentView(),
    lazyLoad: 'ondemand',
    mobileFirst: false,
    nextArrow: $('.next'), //"<div class='next'><span class='icon icon-right-open-big'></span></div>",
    prevArrow: $('.prev'), //"<div class='prev'><span class='icon icon-left-open-big'></span></div>",
    respondTo: 'slider',
    slidesToScroll: 1,
    slidesToShow: 1,
    speed: 800
};

function getCurrentView() {
    options = $.deparam.fragment();
    if (!('view' in options)) {
        return 0;
    }
    else
        return options['view'];
}

function isSelected() {
    options = $.deparam.fragment();

    $('#models').find("[href='#model=" + options['model'].replace(' ', '+').toLowerCase() + "']").addClass('selected');
    $('#models').find("[href='#model=" + options['model'].replace(' ', '+').toLowerCase() + "']").parent().siblings().children("a").not("[href='#model=" + options['model'].replace(' ', '+').toLowerCase() + "']").removeClass('selected');
    $('#fittings').find("[href='#fitting=" + options['fitting'].toLowerCase() + "']").parent().addClass('selected');
    $('#fittings').find("[href='#fitting=" + options['fitting'].toLowerCase() + "']").parent().siblings().children('a').not("[href='#fitting=" + options['fitting'].toLowerCase() + "']").parent().removeClass('selected');



    if (options['model'].toLowerCase() == 'master artisan') {
        $('#fittings').find("[href='#fitting=nickel-silver']").parent().fadeOut();
        if (options['fitting'].toLowerCase() == 'nickel-silver') {
            $('#fittings').find("[href='#fitting=nickel-silver']").parent().removeClass('selected');
            $('#fittings').find("[href='#fitting=silver']").parent().addClass('selected');
            option['fitting'] = 'silver';
            $.bbq.pushState(option);
        }
    }

    else {
        $('#fittings').find("[href='#fitting=nickel-silver']").parent().fadeIn();
    }
}

function setOption() {

    option;

// Get initial URL hash fragment, if it exists
    options = $.deparam.fragment();

//Set default options if no options selected
    if (!('instrument' in options)) {
        options['instrument'] = 'violin';
    }
    if (!('model' in options)) {
        options['model'] = 'classic';
    }

    if (!('fitting' in options)) {
        options['fitting'] = 'nickel-silver';
    }

    if (!('view' in options)) {
        options['view'] = 0;
    }

    //Append selected class and remove selected from siblings

    // Update URL with initial options
    $.bbq.pushState(options);
    isSelected();

    //On click of option, update URL with options
    var $newBow = true;

    $('#models').find('a').add($('#fittings').find('a')).add($('#nav-level-2').find("a[href^='bow']")).on('click', function () {
        var $this = $(this);
        var href = $this.attr('href').replace(/^.*#/, '');
        $newBow = true;
        option = $.deparam(href, true);
        $.bbq.pushState(option);
        isSelected();
        return false;
    });

    // Whenever slick slide changes, update hash
    var $view = "view=" + $('#slides').slick('slickCurrentSlide');
//    var $lastSlide = $('#slides').slick('slickCurrentSlide');
//    var $numSlides = 6;

    $(document).on('click', '.slick-arrow', function () {

        $view = "view=" + $('#slides').slick('slickCurrentSlide');
        $newBow = false;
        option = $.deparam($view, true);
        $.bbq.pushState(option);
    });


// Whenever hash changes, load PHP script with options using AJAX

    $(window).bind('hashchange', function (e) {
        // Get hash fragment again
        options = $.deparam.fragment();
        isSelected();
        if ($newBow) {
            slickSettings.initialSlide = options['view'];
            $.ajax({
                cache: true,
                url: 'includes/bow_slides.php',
                dataType: 'html',
                method: 'POST',
                data: options,
                success: function (html) {
                    $('#slides').fadeIn('fast');
                    $('#slides').slick('unslick');
                    $('#slides').html(html);
                    $('#slides').slick(slickSettings);
                    // if new bow, go to previous view
                    $('#slides').slick('slickGoTo', options['view']);
                    $('a[data-rel^=lightcase]').lightcase(lightcaseSettings);
                    $('.instrument').text(options['instrument']);
                    //$('footer').show();
                }
            });
        }
    }).trigger('hashchange');

}

function debug(aString) {
    console.log(aString);
}