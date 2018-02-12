// FIX: CSS FAILOVER IF JAVASCRIPT IS DISABLED... use <noscript> tag in <head>
// with .no-script displaying nav with CSS
$(document).ready(function () {
    if ($('body').is($('#page_index'))) {
        carousel();
        scrollToProcess();
        processOverlay();
        parallax();
    }
    subscribe();
    shrinkHeader();
    headerNav();
});

var $goldLighter = '#F2EDE4';
var $goldLight = '#d6cab2';
var $gold = '#b9a479'; //rgba(193, 165, 122, 1);
var $goldDark = '#5d523d';
var $grayWarm = '#9B948E';

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// COMMON
//------------------------------------------------------------------------------

var $window = $(window);

jQuery.fn.visible = function () {
    return this.css('visibility', 'visible');
};

jQuery.fn.invisible = function () {
    return this.css('visibility', 'hidden');
};

jQuery.fn.visibilityToggle = function () {
    return this.css('visibility', function (i, visibility) {
        return (visibility === 'visible') ? 'hidden' : 'visible';
    });
};

$.extend(jQuery.easing, {myEasing: function (x, t, b, c, d) {
        return x * x;
    }
});

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// CUSTOM CONSTANT CONTACT SUBSCRIBE FORM 
// https://static.ctctcdn.com/h/contacts-embedded-signup-assets/1.0.2/js/signup-form.js
//------------------------------------------------------------------------------
function subscribe() {
    var localizedErrMap = {};
    localizedErrMap['required'] = 'Please enter your email.';
    localizedErrMap['ca'] = 'An unexpected error occurred while attempting to send email.';
    localizedErrMap['email'] = 'Please enter your email address in name@email.com format.';
    localizedErrMap['birthday'] = 'Please enter birthday in MM/DD format.';
    localizedErrMap['anniversary'] = 'Please enter anniversary in MM/DD/YYYY format.';
    localizedErrMap['custom_date'] = 'Please enter this date in MM/DD/YYYY format.';
    localizedErrMap['list'] = 'Please select at least one email list.';
    localizedErrMap['generic'] = 'This field is invalid.';
    localizedErrMap['shared'] = 'Sorry, we could not complete your sign-up. Please contact us to resolve this.';
    localizedErrMap['state_mismatch'] = 'Mismatched State/Province and Country.';
    localizedErrMap['state_province'] = 'Select a state/province';
    localizedErrMap['selectcountry'] = 'Select a country';
    var postURL = 'https://visitor2.constantcontact.com/api/signup';
    var errClass = 'is-error';
    var msgErrClass = 'ctct-form-errorMessage';

    if (typeof $ === 'undefined' && typeof jQuery === 'undefined') {
        /* Load JQuery */
        var jquery_lib = document.createElement('script');
        document.head.appendChild(jquery_lib);
        jquery_lib.onload = function () {
            /* console.log("Loaded JQuery Lib"); */
            var __$$ = jQuery.noConflict(true);
            main(__$$);
        };
        jquery_lib.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js';
    } else {
        main(jQuery);
    }

    function main($) {
        $.support.cors = true;
        if (typeof postURL === 'undefined') {
            postURL = 'https://visitor2.constantcontact.com/api/signup';
        }
        var _form = $('[data-id="embedded_signup:form"]');

        _form.submit(function (e) {
            e.preventDefault();

            /*  Generate the serialized payload and hash to map with */
            var payload = $(this).serialize();
            var payload_check = payload.split('&');
            var payload_check_hash = {};
            /* Populate the hash with values */
            var i, j;
            var field, fnames, fname;
            for (i = 0; i < payload_check.length; i++) {
                var p = payload_check[i].split('=');
                if (p[0].lastIndexOf('list_', 0) === 0) {
                    p[0] = 'list';
                }
                payload_check_hash[p[0]] = p[1];
            }
            /* Clear any errors that may of been set before */
            _form.find('.' + msgErrClass).remove();
            _form.find('.' + errClass).removeClass(errClass);
            _form.find('.ctct-flagged').removeClass('ctct-flagged');

            /* This is the ONLY client side validation */
            var isError = false;

            if (isError === true) {
                return false;
            }

            /* Clean custom fields if needed */
            var payload_clean = payload.split('&');
            var id, item;
            var custom_data_to_clean = {};
            for (i = 0; i < payload_clean.length; i++) {
                item = payload_clean[i].split('=');
                /* See if we have a empty value */
                if (!item[1] || item[1] === "") {
                    /* Check the field name to see if its custom */
                    if (item[0].match(/cf_text_value--[\w0-9\-\:\_]*/)) {
                        id = item[0].split('--')[1];
                        custom_data_to_clean[id] = true;
                    } else if (item[0].match(/cf_date_value_day--[\w0-9\-\:\_]*/)) {
                        id = item[0].split('--')[1];
                        if (!custom_data_to_clean[id]) {
                            custom_data_to_clean[id] = {};
                        }
                        custom_data_to_clean[id]['day'] = true;
                    } else if (item[0].match(/cf_date_value_month--[\w0-9\-\:\_]*/)) {
                        id = item[0].split('--')[1];
                        if (!custom_data_to_clean[id]) {
                            custom_data_to_clean[id] = {};
                        }
                        custom_data_to_clean[id]['month'] = true;
                    } else if (item[0].match(/cf_date_value_year--[\w0-9\-\:\_]*/)) {
                        id = item[0].split('--')[1];
                        if (!custom_data_to_clean[id]) {
                            custom_data_to_clean[id] = {};
                        }
                        custom_data_to_clean[id]['year'] = true;
                    } else {
                        delete payload_clean[i];
                    }
                }
            }

            payload_clean = payload_clean.filter(function (n) {
                return n !== undefined;
            });
            /* Iterate over the flagged ids and scrub the data */
            for (i in custom_data_to_clean) {
                /* Loop over the payload and remove the fields that match out scrub needs */
                for (j = 0; j < payload_clean.length; j++) {
                    item = payload_clean[j];
                    if (item) {
                        item = item.split('=');
                        /* Match based of field id */
                        if (item[0].match(new RegExp('.*--' + i, 'i'))) {
                            /* If the value is a bool then we are dealing with text */
                            if (custom_data_to_clean[i] === true) {
                                delete payload_clean[j];
                                /* If the value is an object its a date and we should only scrub if all fields are empty */
                            } else if (typeof custom_data_to_clean[i] === 'object') {
                                if (custom_data_to_clean[i]['day'] === true && custom_data_to_clean[i]['month'] === true && custom_data_to_clean[i]['year'] === true) {
                                    delete payload_clean[j];
                                }
                            }
                        }
                    }
                }
            }

            payload_clean = payload_clean.filter(function (n) {
                return n !== undefined;
            }).join('&');

            $.ajax({
                type: 'POST',
                crossDomain: true,
                url: postURL,
                data: payload_clean,
                error: function (xhr, status, err) {
                    console.log(xhr, status, err);
                    json = xhr.responseJSON;
                    if (json) {
                        if (json.offenders) {
                            for (var i in json.offenders) {
                                var item = json.offenders[i];
                                var offender = item.offender;
                                var required = item.required;
                                var inputUI = _form.find('[name=' + offender + ']');
                                var labelUI = null;
                                var p = inputUI.parent('div');
                                if (p.length === 0) {
                                    labelUI = _form.find('[data-name=' + offender + ']');
                                    if (labelUI.length === 0) {
                                        continue;
                                    }
                                } else {
                                    labelUI = p.find('label');
                                }

                                if (required === true && !offender.match(/list.*/)) {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['required'] + '</div>');
                                    }
                                } else if (offender === 'ca') {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['ca'] + '</div>');
                                    }
                                } else if (offender === 'email') {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['email'] + '</div>');
                                    }
                                } else if (offender === 'birthday_day' || offender === 'birthday_month') {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['birthday'] + '</div>');
                                    }
                                } else if (offender === 'anniversary_day' || offender === 'anniversary_month' || offender === 'anniversary_year') {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['anniversary'] + '</div>');
                                    }
                                } else if (offender.match(/cf_date_value_day--[\w0-9-:]*/) ||
                                        offender.match(/cf_date_value_month--[\w0-9-:]*/) ||
                                        offender.match(/cf_date_value_year--[\w0-9-:]*/) ||
                                        offender.match(/cf_date_name--[\w0-9-:]*/) ||
                                        offender.match(/cf_date_label--[\w0-9-:]*/)) {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['custom_date'] + '</div>');
                                    }
                                } else if (offender.match(/list.*/)) {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['list'] + '</div>');
                                    }
                                } else {
                                    if (!labelUI.hasClass('ctct-flagged')) {
                                        labelUI.show().after('<div class="' + msgErrClass + '">' + localizedErrMap['generic'] + '</div>');
                                    }
                                }
                                inputUI.addClass(errClass);
                                labelUI.addClass('ctct-flagged');
                            }
                        } else {
                            _form.prepend('<div class="' + msgErrClass + '">' + localizedErrMap['shared'] + '</div>');
                        }
                    } else {
                        _form.prepend('<div class="' + msgErrClass + '">' + localizedErrMap['shared'] + '</div>');
                    }
                },
                success: function (data, status, xhr) {
                    console.log(data, status, xhr);
                    $('.ctct-embed-signup p').hide();
                    $('.ctct-embed-signup h2').hide();
                    $('.ctct-embed-signup button').hide();
                    $('.ctct-embed-signup form').hide();
                    $('footer >div >div').css('margin-top', '3rem');
                    $('#success_message').removeClass('u-hide');
                    $('#success_message').show();
                }
            });
            return false;
        });
    }
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PARALLAX
// http://code.tutsplus.com/tutorials/a-simple-parallax-scrolling-technique--net-27641 (Comments) @Jonathan Olsen
// http://jsfiddle.net/FcLmM/
//------------------------------------------------------------------------------
function parallax() {
    $('.parallax').each(function () {
        var $bgobj = $(this);

        $(window).scroll(function () {
            var yPos;

            yPos = -(($(window).scrollTop() - $bgobj.offset().top) / $bgobj.data('speed'));

            var coords = '50% ' + yPos + 'px';

            $bgobj.css({backgroundPosition: coords});

            if ($(window).scrollTop() == 0) {
                $("#process-intro .slide1").css({'background-position': 'center 205px'});
            }
        });
    });
}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// SHRINK HEADER
//------------------------------------------------------------------------------

var $processIntro = $("#process-intro");
var $nav = $("nav");
var $logo = $("#logo");
var $logoSmall = $("#logo-small");
var $isShrunk = false;
var $slideLine = $("#nav-level-1 .slide-line");

function shrinkHeader() {
    $window.scroll(function () {
        var $this = $(this);
        var speed = "0.75";
        if ($this.scrollTop() > 1) {
            $slideLine.css("top", "54px");
            $logo.slideUp(speed);
            $logoSmall.fadeIn('slow').visible();
            $isShrunk = true;
            if ($('body').is('#page_index')) {
                $('main').css('margin-top', '-50px');
            }
        }
        else {
            $slideLine.css("top", "205px");
            $logo.slideDown(speed);
            $logoSmall.fadeOut('fast').invisible();
            $isShrunk = false;
            if ($('body').is('#page_index')) {
                $('main').css({'margin-top': '0'});
            }

        }
    });
}
//
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// NAVIGATION
//------------------------------------------------------------------------------

function headerNav() {

    var $navLvl2 = $("#nav-level-2");
    var $overlay = $("#overlay");
    var $navItem = $("#nav-level-1").find(".nav-item");
    var $navToggle = $("#nav-level-1").find(".has-nav-sub");
    var $navItems = $('#nav-level-1 .nav-items');


    //Sliding underline effect on hover
    //$navItems.append('<li class="slide-line"></li>');


    var $slideLineOffset = $slideLine.offset();

// Get header shrink status

    $navItems.on('mouseenter', function () {
        $slideLine.fadeIn("fast");
    }).on('mouseleave', function () {
        $slideLine.fadeOut("fast");
    });

    $navItem.on('mouseenter', function () {
        if ($isShrunk === true) {
            $slideLine.css("top", "54px");
        }
        else
            $slideLine.css("top", "205px");
        var $this = $(this);
        //If no item hovered before, fade in to middle of element
        var $thisOffset = $this.offset();
        var $slideLineTo = $thisOffset.left + ($this.outerWidth() / 2) - ($slideLine.outerWidth() / 2);
        $slideLine.animate({"left": $slideLineTo + "px"}, "fast").visible();

        //else line moves to middle bottom of hovered element
        //get left offset of this + offset/2
        //If on home, and not on bow submenu, fade out line after a while
        //if bows are selected, line returns to bows when mouseleave from level-1
    });



    // Underline starts from current page's nav item, or if Home, invisible

    //Display level 2
    $navToggle.add($overlay).on("click", function () {

        if ($navLvl2.css("display") === 'none') {
            $navLvl2.add($overlay).fadeIn();
        }
        else {
            $navLvl2.add($overlay).fadeOut();
        }

    });
}

//
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// ACTION: INTRO PAGE DOWN
//------------------------------------------------------------------------------

function scrollToProcess() {
    $('#process-intro').find('.icon').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#process-step-1').offset().top
        }, 2000, 'myEasing');
    });
}
//
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PROCESS STEP CAROUSELS
//------------------------------------------------------------------------------

function carousel() {

    var $slides = $(".slides"),
            $slide = $(".slide"),
            speed = 750, //slower
            $processStep = $(".process-step").not("#process-intro, #process-outro"),
            $prev = $(".prev"),
            $next = $(".next"),
            slideWidth = '100',
            numSlides,
            $thisAction,
            $thisCarousel,
            $thisSlideText,
            $thisSlidesData,
            $thisSlides;

    $slides.data('currentSlide', 1);

    $prev.add($next).on("click", function () {

        $thisAction = $(this);
        $thisCarousel = $(this).closest($processStep);
        $thisSlides = $thisCarousel.find($slides);
        $thisSlidesData = $thisSlides.data();
        numSlides = $thisSlides.find($slide).length;

        if ($thisSlides.is(":animated")) {
            return false;
        }

        if ($thisSlides.find($slide).first().offset().left === 0) {
            $thisSlidesData.currentSlide = 1;
        }


        if ($thisAction.is($next)) {
            if ($thisSlidesData.currentSlide === numSlides) {
                $thisCarousel.animate({opacity: '0'}, '200', function () {
                    $thisSlides.css({left: 0});
                });
                $thisCarousel.animate({opacity: 1}, 'slow');
                $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeOut(function () {
                    $thisSlidesData.currentSlide = 1;
                    $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeIn();
                });

            }
            else {
                $thisSlides.animate({left: "-=100%"}, speed);
                $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeOut(function () {
                    $thisSlidesData.currentSlide++;
                    $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeIn();
                });

            }

            if ($thisCarousel.find($prev).css("opacity") === "0") {
                $thisCarousel.find($prev).visible().animate({opacity: "1"}, speed);
            }
        }

        if ($thisAction.is($prev)) {
            if ($thisSlidesData.currentSlide === 1) {
                $thisCarousel.animate({opacity: '0'}, '200', function () {
                    $thisSlides.css({left: -slideWidth * (numSlides - 1) + '%'});
                });

                $thisCarousel.animate({opacity: 1}, 'slow');
                $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeOut(function () {
                    $thisSlidesData.currentSlide = numSlides;
                    $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeIn();
                });
            }
            else {
                $thisSlides.animate({left: "+=100%"}, speed);
                $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeOut(function () {
                    $thisSlidesData.currentSlide--;
                    $thisCarousel.find('.process-text:nth-of-type(' + $thisSlidesData.currentSlide + ")").fadeIn();
                });
            }
            if ($thisCarousel.find($next).css("opacity") === "0") {
                $thisCarousel.find($next).visible().animate({opacity: "1"}, speed);
            }

        }
    });

    $prev.add($next).hover(function () {
        if ($(this).find('.slide-nav').is(":animated")) {
            return false;
        }
        $(this).find($('.slide-nav')).show(400);
    }, function () {
        if ($(this).find('.slide-nav').is(":animated")) {
            return false;
        }
        $(this).find($('.slide-nav')).hide(400);
    });


}
//
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
// PROCESS STEP SECONDARY IMAGE OVERLAYS
//------------------------------------------------------------------------------

function processOverlay() {
    var $thisContent;
    var $thisOverlayId;
    var $thisOverlay;
    var $overlayBg;
    var $open = $('.action_open');
    var $close = $('.action_close');
    // when action_open clicked, hide article and show overlay with correct div
    $open.on('click', function () {
        $thisContent = $(this).parents('.content');
        $thisOverlayId = $(this).data('overlay');
        $thisOverlay = $(this).parents('.process-step').find('div[data-overlay="' + $thisOverlayId + '"]');
        $overlayBg = $thisOverlay.parent('.overlay');

        $thisContent.fadeOut();
        $overlayBg.add($thisOverlay).fadeIn();
    });

    $close.on('click', function () {
        $thisContent = $(this).parents('.process-step').find('.content');
        //$thisOverlayId = $(this).data('overlay');
        $thisOverlay = $(this).parent('div');
        $overlayBg = $thisOverlay.parents('.overlay');

        $overlayBg.add($thisOverlay).fadeOut();
        $thisContent.fadeIn();
    });

    // when action_close clicked, hide this overlay and show article... map ESC and img to close too
}