$(document).ready(function () {
    //$instrument = window.location.href.substr(window.location.href.indexOf('=') + 1).replace("+", " ");
    $('#slides').slick(slickSettings);
    setOption();
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

function setOption() {
    var option;
    function isSelected() {
        $('#models').find("[href='#model=" + options['model'].replace(' ', '+') + "']").addClass('selected');
        $('#models').find("[href='#model=" + options['model'].replace(' ', '+') + "']").parent().siblings().children("a").not("[href='#model=" + options['model'].replace(' ', '+') + "']").removeClass('selected');
        $('#fittings').find("[href='#fitting=" + options['fitting'] + "']").parent().addClass('selected');
        $('#fittings').find("[href='#fitting=" + options['fitting'] + "']").parent().siblings().children('a').not("[href='#fitting=" + options['fitting'] + "']").parent().removeClass('selected');

        if (options['model'] == 'master artisan') {
            $('#fittings').find("[href='#fitting=nickel-silver']").parent().addClass('hidden');
            if (options['fitting'] == 'nickel-silver') {
                $('#fittings').find("[href='#fitting=nickel-silver']").parent().removeClass('selected');
                $('#fittings').find("[href='#fitting=silver']").parent().addClass('selected');
                option['fitting'] = 'silver';
                $.bbq.pushState(option);
            }
        }

        else {
            $('#fittings').find("[href='#fitting=nickel-silver']").parent().removeClass('hidden');
        }
    }

    // Get initial URL hash fragment, if it exists
    var options = $.deparam.fragment();

    //Set default options if no options selected
    if (!('instrument' in options)) {
        options['instrument'] = 'violin';
    }
    if (!('model' in options)) {
        options['model'] = 'classic';
    }

    if (!('fitting' in options)) {
        options['fitting'] = 'silver';
    }

    //Append selected class and remove selected from siblings
    isSelected();
    
    // Update URL with initial options
    $.bbq.pushState(options);

    //On click of option, update URL with options

    $('#models').find('a').add($('#fittings').find('a')).add($('#nav-level-2').find('a')).on('click', function () {
        var $this = $(this);
        var href = $this.attr('href').replace(/^.*#/, '');
        option = $.deparam(href, true);
        console.log(option);
        $.bbq.pushState(option);
        console.log(option);

        return false;
    });

// Whenever hash changes, load PHP script with options using AJAX
    $(window).bind('hashchange', function (e) {
        // Get hash fragment again
        options = $.deparam.fragment();
        isSelected();

        $.ajax({
            url: 'includes/bow-maker_slides.php',
            dataType: 'html',
            method: 'POST',
            data: options,
            success: function (html) {
                $('#slides').slick('unslick');
                $('#slides').html(html);
                $('#slides').slick(slickSettings);
                $('.instrument').text(options['instrument']);
                $('footer').show();
            }
        });


    }).trigger('hashchange');


}