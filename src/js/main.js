(function () {
  const $IconArrow =
    '<svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.7687 14.9712L8.17426 15.5659L1.78526 8.81414L8.17426 2.06239L8.76542 2.65379L3.62579 8.07602L2.97925 8.75811L3.61994 9.44569L8.7687 14.9712Z" fill="white" stroke="white" stroke-width="2"></path></svg>';
  const $NextArrow = `<a class="pagination__next" style="">${$IconArrow}</a>`;
  const $PrevArrow = `<a class="pagination__prev" style="">${$IconArrow}</a>`;

  const sliderSettings = {
    slidesToShow: 1,
    adaptiveHeight: true,
    prevArrow: `<a class="modal-slider__prev">${$IconArrow}</a>`,
    nextArrow: `<a class="modal-slider__next">${$IconArrow}</a>`,
    infinite: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  }

  $(document).ready(function () {
    $("#userSlider").slick({
      slidesToShow: 1,
      adaptiveHeight: true,
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
    });

    let showSlideCount = 4;

    $("#bookCarousel").slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      infinite: false,
      arrows: false,
      asNavFor: '#pagination',
      // fade: true,
      // speed: 0,
      // lazyLoad: "progressive",
      // adaptiveHeight: true,
      // appendArrows: $(".pagination"),
      // dots: true,
      // appendDots: $(".pagination .slick-track"),
      // customPaging: (slider, i) =>
      //   `<a class='pagination--slick-dot'>${i + 1}</a>`,
      // responsive: [
      //   {
      //     breakpoint: 1200,
      //     settings: {
      //       slidesToShow: 3,
      //       slidesToScroll: 3,
      //       // infinite: true,
      //       // dots: true,
      //     },
      //   },
      //   {
      //     breakpoint: 992,
      //     settings: {
      //       slidesToShow: 2,
      //       slidesToScroll: 2,
      //     },
      //   },
      //   {
      //     breakpoint: 640,
      //     settings: {
      //       slidesToShow: 1,
      //       slidesToScroll: 1,
      //     },
      //   },
      // ],
    });
    
    const bookSlideCount = $("#bookCarousel").slick('getSlick').slideCount / 4;
    const $pagination = $('<div id="pagination" class="pagination"></div>');
    const $wrap = $('#wrap');

    console.log($("#bookCarousel").slick('getSlick'));

    for (let index = 1; index <= bookSlideCount; index++) {
      const nodePaginationElem = $(`<div class='centerSlide'><a class='pagination--slick-dot'>${index}</a></div>`)
      $pagination.append(nodePaginationElem)
    }
    
    $pagination.appendTo($wrap);
    if ($('.pagination--slick-dot').length === bookSlideCount) {
      $pagination.slick({
        asNavFor: '#bookCarousel',
        slidesToShow: bookSlideCount,
        slidesToScroll: 1,
        // infinite: false,
        speed: 0,
        nextArrow: $NextArrow,
        prevArrow: $PrevArrow,
        focusOnSelect: true
      })
    }

    // $('#pagination').slick({
    //   slidesToShow: 2,
    //   slidesToScroll: 1,
    //   asNavFor: '#bookCarousel',
    //   nextArrow: $NextArrow,
    //   prevArrow: $PrevArrow,
    // })
    // $modalSlider.slick(sliderSettings);
  });
  
  // HEADER
  const burgerBtn = $(".burger");
  const nav = $(".nav");
  const header = $(".header");
  const headerDecor = $(".header__decor");
  let scrollPrev = 0;

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

  // open nav
  burgerBtn.on("click", () => {
    nav.toggleClass("active");
    burgerBtn.toggleClass("burger--active");
    headerDecor.toggleClass("is-hidden");
  });

  // animate scroll anchor link
  $('a[href*="#"]').on("click", function () {
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      400
    );
    return false;
  });

  // MODAL
  const $bookCards = document.querySelectorAll(".book-card");
  const $modal = $("#modal-one");
  const $closeModal = $(".modal-close");
  const $overlayModal = $(".modal-exit");
  const $modalPreviewText = $(".text-preview");
  const $modalSlider = $("#currentBookSlider");

  const clearNode = (nodeName) => {
    const nodeToClear = document.querySelector(nodeName);

    while (nodeToClear.firstChild) {
      nodeToClear.removeChild(nodeToClear.firstChild);
    }
  };

  $bookCards.forEach((trigger) => {
    trigger.addEventListener("click", function (event) {
      if (event.target.parentElement.dataset.modal === "modal-one") {
        $modal.addClass("open");
        $('body').css('overflow', 'hidden');

        const $currentCardText = $(this).find(".text__subtitle").html();
        const $currentImages = $(this).find(".book-card__thumbnail-wrap").html();

        clearNode(".text-preview");
        clearNode("#currentBookSlider");

        $($currentCardText).appendTo($modalPreviewText);
        $($currentImages).appendTo($modalSlider);

        $modalSlider.slick(sliderSettings);
      }
    });
  });

  const actionsClose = () => {
    $modalSlider.removeClass("slick-initialized slick-slider slick-dotted");
    $('body').css('overflow', 'auto');
    $modal.removeClass("open");
  }

  $closeModal.on("click", () => actionsClose());
  $overlayModal.on("click", () => actionsClose());
})();
