import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  constructor(slides) {
    this.slides = slides;

    this.render();

  }

  render() {

    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner">
      `);

    this.carouselInner = this.elem.querySelector(".carousel__inner");
    this.slideWidth = this.carouselInner.offsetWidth;

    this.arrowRight = this.elem.querySelector(".carousel__arrow_right");
    this.arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.arrowLeft.style.display = "none";

    let carouselSlides = this.slides.map(item => createElement(`
      <div class="carousel__slide" data-id='${item.id}'>
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `));

    this.carouselInner.append(...carouselSlides);

    this.slidePosition = 0;
    this.currentSlide = 1;

    this.elem.addEventListener('click', (event) => {
      this.slideWidth = this.carouselInner.offsetWidth;
      this.moveSlides(event);
      this.addOnPlus(event);
    });
  }

  moveSlides = (event) => {
    this.lastSlide = this.carouselInner.querySelectorAll(".carousel__slide").length;

    if (event.target.closest(".carousel__arrow_right")) {
      this.next();
      this.carouselInner.style.transform = `translateX(${this.slidePosition}px)`;
    }

    if (event.target.closest(".carousel__arrow_left")) {
      this.prev();
      this.carouselInner.style.transform = `translateX(${this.slidePosition}px)`;
    }

    this.arrowLeft.style.display = this.currentSlide === 1 ? "none" : "";
    this.arrowRight.style.display = this.currentSlide === this.lastSlide ? "none" : "";

  };

  next() {
    this.slidePosition -= this.slideWidth;
    this.currentSlide++;
  }

  prev() {
    this.slidePosition += this.slideWidth;
    this.currentSlide--;
  }

  addOnPlus = (event) => {
    let btn = event.target.closest('.carousel__button');

    if (btn) {
      let addEvent = new CustomEvent('product-add', {
        detail: btn.closest('.carousel__slide').dataset.id,
        bubbles: true
      });

      this.elem.dispatchEvent(addEvent);
    }
  }

}

