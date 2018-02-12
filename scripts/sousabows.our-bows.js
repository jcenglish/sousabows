$(document).ready(function () {
    setOption();
});

function setOption() {
    function isSelected() {
        $('.filter').find("[href='#groupby=" + options['groupby'].replace(' ', '+') + "']").addClass('selected');
        $('.filter').find("[href='#groupby=" + options['groupby'].replace(' ', '+') + "']").parent().siblings().children("a").not("[href='#groupby=" + options['groupby'].replace(' ', '+') + "']").removeClass('selected');
}
    // Get initial URL hash fragment, if it exists
    var options = $.deparam.fragment();

    // Update URL with initial options
    $.bbq.pushState(options);

    //Append selected class and remove selected from siblings
    isSelected();

    //On click of option, update URL with options

    $('.filter').find('a').on('click', function () {
        var $this = $(this);
        var href = $this.attr('href').replace(/^.*#/, '');
        var option = $.deparam(href, true);

        $.bbq.pushState(option);

        return false;
    });

// Whenever hash changes, load PHP script with options using AJAX

    $(document).ajaxStart(function () {
        $('.view').hide();
        $('#load').show();
    });

    $(document).ajaxComplete(function () {
        $('#load').hide();
        //$('.view').fadeIn('fast');
    });

    $(window).bind('hashchange', function (e) {
        // Get hash fragment again
        options = $.deparam.fragment();
        isSelected();
        $.ajax({
            url: 'scripts/our-bows_view.php',
            method: 'POST',
            data: options,
            success: function (html) {
                $('.view').fadeOut('fast', function() {$('.view').html(html).fadeIn();});
            }
        });
    }).trigger('hashchange');
}