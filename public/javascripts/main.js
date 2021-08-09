var djinni = {
    orientationChange: function() {
        var mql = window.matchMedia("(orientation: landscape)");

        if (mql.matches) {
            $("html").addClass('view--landscape');
            
            // if ($('.responsive-slider').length) {
            //     console.log('landscape');
            //     djinni.init.slickSlider();
            // }
        } else {
            $("html").removeClass('view--landscape');
            
            // if ($('.responsive-slider').length) {
            //     console.log('portret');
            //     djinni.init.slickSlider();
            // }
        }

    },
    topNavigationOnScroll: function() {
        // Hide Header on on scroll down
        var myWindow = $(window);

        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbar = $('.nvg');
        var topNavbarHeight = $('.nvg.nvg-top').outerHeight();
        
        if ($('.nvg.nvg-bottom').length) {
            var bottomNavbarHeight = $('.nvg.nvg-bottom').outerHeight();
            var navbarHeight = (topNavbarHeight + bottomNavbarHeight) / 2;            
        } else {
            var navbarHeight = topNavbarHeight;  
        }

        myWindow.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function() {
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 50);

        function hasScrolled() {
            var st = $(this).scrollTop();

            // Make sure they scroll more than delta
            if (Math.abs(lastScrollTop - st) <= delta)
                return;

            // If they scrolled down and are past the navbar, add class .nav-up.
            // This is necessary so you never see what is "behind" the navbar.
            if (st > lastScrollTop && st > navbarHeight) {
                // Scroll Down
                navbar.removeClass('nvg_showed').addClass('nvg_hide');
            } else {
                // Scroll Up
                if (st + myWindow.height() < $(document).height()) {
                    navbar.removeClass('nvg_hide').addClass('nvg_showed');
                }
            }

            lastScrollTop = st;
        }
    },
    tabs: function() {
        var tabs = $('.tabs');
        var btn = tabs.find('.tabs-item');   
        
        btn.on('click', function(e) {
          let el = $(this);
          
          btn.removeClass('active');
          el.addClass('active');

          e.preventDefault();
          e.stopPropagation();

        });
    },
    init: function() {
        // this.orientationChange();
        // this.topNavigationOnScroll();   
        this.tabs();
    }
};

var mainContent = $('.app-view');
mainContent.hide();

document.onreadystatechange = function() {
    if (document.readyState == "interactive") {
        setTimeout(function() {
            djinni.init();
            $('.white_over_all').css({
                'display': 'none'
            });
        }, 50);
        mainContent.show();
    }
};
