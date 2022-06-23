(function () {
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
      header.removeClass("scroll");
    }

    scrollPrev = scrolled;
  });

  // MODAL
  const modals = document.querySelectorAll("[data-modal]");

  modals.forEach(function (trigger) {
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
