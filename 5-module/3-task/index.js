function initCarousel() {
  const carousel = document.querySelector(".carousel");                        // container
  const carouselInner = document.querySelector(".carousel__inner");            // move slides
  const slideWidth = carouselInner.offsetWidth;                                // slide width

  const lastSlide = document.querySelectorAll(".carousel__slide").length;      // last slide
  console.log(lastSlide);

  const arrowRight = document.querySelector(".carousel__arrow_right");
  const arrowLeft = document.querySelector(".carousel__arrow_left");
  arrowLeft.style.display = "none";

  let slidePosition = 0;
  let currentSlide = 1;

  carousel.addEventListener("click", event => {
    if (event.target.closest(".carousel__arrow_right")) {
      next();
      moveSlide();
    }

    if (event.target.closest(".carousel__arrow_left")) {
      prev();
      moveSlide();
    }

    currentSlide == 1 ? arrowLeft.style.display = "none" : arrowLeft.style.display = "";
    currentSlide == lastSlide ? arrowRight.style.display = "none" : arrowRight.style.display = "";
  });

  function next() {
    slidePosition -= slideWidth;
    currentSlide++;
  }

  function prev() {
    slidePosition += slideWidth;
    currentSlide--;
  }

  function moveSlide() {
    carouselInner.style.transform = `translateX(${slidePosition}px)`;
  }

}


