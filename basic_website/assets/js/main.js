(function($) {
    var $window = $(window),
        $body = $('body'),
        $header = $('#header'),
        $footer = $('#footer'),
        $main = $('#main'),
        settings = {
            parallax: true,
            parallaxFactor: 20
        };

    // Breakpoints.
    breakpoints({
        xlarge: [ '1281px', '1800px' ],
        large: [ '981px', '1280px' ],
        medium: [ '737px', '980px' ],
        small: [ '481px', '736px' ],
        xsmall: [ null, '480px' ]
    });

    // Play initial animations on page load.
    $window.on('load', function() {
        window.setTimeout(function() {
            $body.removeClass('is-preload');
        }, 100);
    });

    // Touch?
    if (browser.mobile) {
        $body.addClass('is-touch');
        window.setTimeout(function() {
            $window.scrollTop($window.scrollTop() + 1);
        }, 0);
    }

    // Footer repositioning based on breakpoints.
    breakpoints.on('<=medium', function() {
        $footer.insertAfter($main);
    });

    breakpoints.on('>medium', function() {
        $footer.appendTo($header);
    });

    // Parallax header.
    if (settings.parallax && browser.name !== 'ie' && !browser.mobile) {
        breakpoints.on('<=medium', function() {
            $window.off('scroll.strata_parallax');
            $header.css('background-position', '');
        });

        breakpoints.on('>medium', function() {
            $header.css('background-position', 'left 0px');
            $window.on('scroll.strata_parallax', function() {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
            });
        });

        $window.on('load', function() {
            $window.triggerHandler('scroll');
        });
    }

    // Lightbox gallery.
    $window.on('load', function() {
        $('#two').poptrox({
            caption: function($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (breakpoints.active('<=small') ? 0 : 50)
        });
    });

})(jQuery);

// Jump to Top Button Logic
document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // Show the button when the user scrolls down 20px from the top
    window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    });

    // Scroll to the top when the button is clicked
    scrollTopBtn.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Smooth scrolling effect
        });
    });
});
