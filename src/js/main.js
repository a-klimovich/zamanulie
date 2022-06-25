(function () {
  

  $(document).ready(function () {
    $("#userSlider").slick({
      slidesToShow: 1,
      adaptiveHeight: true,
      dots: true,
      // infinite: true,
      // autoplay: true,
      // autoplaySpeed: 4000,
      arrows: false,
    });

    // TODO:
    $("#bookCarousel").slick({
      slidesToShow: 4,
      adaptiveHeight: true,
      dots: true,
      // dotsClass: 'pagination',
      infinite: false,
      arrows: false,
      customPaging: function (slider, i) {
        const $elem = $('.pagination');
        $elem.children().eq(-1).before(`<a data-current=${i} class="pagination--slick-dot">${i + 1}</a>`);
      }
    });

    $('.pagination--slick-dot').on('click', (e) => {
      return $('#bookCarousel').slick('slickGoTo', e.target.dataset.current);
    })

    $('#bookCarousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
      $('.pagination--slick-dot').each(function() {
        $(this).removeClass('active')
      })
      
      $('.pagination--slick-dot').map((_, element) => {
        if (Number(element.dataset.current) === currentSlide) {
          $(element).addClass('active')
        }
      })
    });

    const IconArrow = '<svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.7687 14.9712L8.17426 15.5659L1.78526 8.81414L8.17426 2.06239L8.76542 2.65379L3.62579 8.07602L2.97925 8.75811L3.61994 9.44569L8.7687 14.9712Z" fill="white" stroke="white" stroke-width="2"></path></svg>';
    const NextArrowIcon = `<a class="pagination__next" style="">${IconArrow}</a>`;
    const PrevArrowIcon = `<a class="pagination__prev" style="">${IconArrow}</a>`;

    if ($('.pagination')) {
      $('ul.pagination').append(NextArrowIcon);
      $('ul.pagination').append(PrevArrowIcon);
    
      $('.pagination__next').on('click', () => {
        $("#bookCarousel").slick('slickNext')
      })
    
      $('.pagination__prev').on('click', () => {
        $("#bookCarousel").slick('slickPrev')
      })
    }
  });

  // HEADER
  const burgerBtn = $(".burger");
  const nav = $(".nav");
  const header = $(".header");
  const headerDecor = $(".header__decor");
  let scrollPrev = 0;

  // open nav
  burgerBtn.on('click', () => {
    nav.toggleClass('active');
    burgerBtn.toggleClass('burger--active');
    headerDecor.toggleClass('is-hidden');
  });

  // hede show menu on scroll
  $(window).scroll(function () {
    const scrolled = $(window).scrollTop();

    if (scrolled > 71 && scrolled > scrollPrev) {
      header.addClass("out");
      header.addClass("scroll");
    } else {
      header.removeClass("out");
    }
    
    if (scrolled <= 10) {
      header.removeClass("scroll");
    }

    scrollPrev = scrolled;
  });

  // MODAL
  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      event.preventDefault();
      const modal = document.getElementById(trigger.dataset.modal);
      const exits = modal.querySelectorAll(".modal-exit");

      modal.classList.add("open");

      exits.forEach(function (exit) {
        exit.addEventListener("click", function (event) {
          event.preventDefault();
          modal.classList.remove("open");
        });
      });
    });
  });
})();
