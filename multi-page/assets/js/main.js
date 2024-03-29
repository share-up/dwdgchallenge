(function($) {
  
  "use strict";  

  $(window).on('load', function() {

  /*Page Loader active
    ========================================================*/
    $('#preloader').fadeOut();

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
            /* logo dark -> ambiente claro e vice-versa */
            document.getElementById("nav-logo").src="assets/img/Logo_DWDG_dark24.png"
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
            document.getElementById("nav-logo").src="assets/img/DWDG24b&v.png"
        }
    });

    /* ==========================================================================
       countdown timer
       ========================================================================== */
     jQuery('#clock').countdown('2024/3/2',function(event){
      var $this=jQuery(this).html(event.strftime(''
      +'<div class="time-entry days"><span>%-D</span> <b>:</b> Days</div> '
      +'<div class="time-entry hours"><span>%H</span> <b>:</b> Hours</div> '
      +'<div class="time-entry minutes"><span>%M</span> <b>:</b> Minutes</div> '
      +'<div class="time-entry seconds"><span>%S</span> Seconds</div> '));
    });

    /*====================================
    slick menu js
    ======================================*/
    var logo_path=$('.mobile-menu').data('logo');
    $('#navbarCollapse').slicknav({
        appendTo:'.mobile-menu',
        removeClasses:false,
        label:'',
        closedSymbol:'<i class="lni-chevron-right"><i/>',
        openedSymbol:'<i class="lni-chevron-down"><i/>',
        brand:'<a href="index.html"><img src="'+logo_path+'" class="img-responsive" alt="logo"></a>'
    });

      /* WOW Scroll Spy
    ========================================================*/
     var wow = new WOW({
      //disabled for mobile
        mobile: false
    });
    wow.init();

    /* Nivo Lightbox 
    ========================================================*/
    $('.lightbox').nivoLightbox({
        effect: 'fadeScale',
        keyboardNav: true,
      });

    // one page navigation 
    $('.navbar-nav').onePageNav({
            currentClass: 'active'
    }); 

    /* Counter
    ========================================================*/
    $('.counterUp').counterUp({
     delay: 10,
     time: 1500
    });

    /* Back Top Link active
    ========================================================*/
      var offset = 200;
      var duration = 500;
      $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
          $('.back-to-top').fadeIn(400);
        } else {
          $('.back-to-top').fadeOut(400);
        }
      });

      $('.back-to-top').on('click',function(event) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: 0
        }, 600);
        return false;
      });

    /*====================================
    submit
    ======================================*/
    // listen for  form submit
    document.getElementById('contactForm').addEventListener('submit',submitForm);

    function submitForm(e){
        e.preventDefault();

        // Get Values
        var name = getInputVal('name');
        var email = getInputVal('email');
        var subject = getInputVal('subject');
        var message = getInputVal('message');
    }

    //Funciton to get form values
    function getInputVal(id){
      return document.getElementById(id).value;
    }

  });      

}(jQuery));
