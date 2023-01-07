
function main() {

  (function () {
    'use strict';
    // Anchor scroll behaviour
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        window.scrollTo({
          top: document.querySelector(this.getAttribute('href')).getBoundingClientRect().top + window.pageYOffset - 100,
          behavior: 'smooth'
        });
      });
    });

    // Navbar shrink
    $(window).scroll(function () {
      if ($("#navigationbar").offset().top > 50) {
        $("#navigationbar").addClass("scrolled");
      } else {
        $("#navigationbar").removeClass("scrolled");
      }
    });

    // Hamburger click
    $("#navigationbar .hamburger").on("click", function () {
      $("#navigationbar .items").toggleClass("active");
    });

    // Portfolio isotope filter
    $(window).load(function () {
      var $container = $('.portfolio-items');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      $('.cat a').click(function () {
        $('.cat .active').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });

    });

    // Nivo Lightbox 
    $('.portfolio-item a').nivoLightbox({
      effect: 'slideDown',
      keyboardNav: true,
    });

    // Testimonial Slider
    $(document).ready(function () {
      $("#testimonial").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true
      });

    });

    const transitionElements = document.querySelectorAll(".transition");
    const appearOptions = {
      threshold: 0,
      rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScroll.unobserve(entry.target);
        };
      });
    }, appearOptions);

    transitionElements.forEach(transitionElement => {
      appearOnScroll.observe(transitionElement);
    });




    const countingNumbers = document.querySelectorAll(".num");
    let interval = 2000;
    const countingOptions = {
      threshold: 0,
      rootMargin: "0px 0px -50px 0px"
    };
    const countingOnScroll = new IntersectionObserver(function (entries, countingOnScroll) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        } else {
          let startValue = 0;
          let endValue = parseInt(entry.target.getAttribute("data-val"));
          let duration = Math.floor(interval / endValue);
          let counter = setInterval(function () {
            startValue++;
            entry.target.innerHTML = startValue;
            if (startValue === endValue) {
              clearInterval(counter);
            }
          }, duration);
          countingOnScroll.unobserve(entry.target);
        };
      });
    }, countingOptions);

    countingNumbers.forEach(countingNumber => {
      countingOnScroll.observe(countingNumber);
    });



  }());
}
main();
