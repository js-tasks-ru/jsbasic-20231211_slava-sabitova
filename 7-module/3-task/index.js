import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  constructor({ steps, value = 0 }) {

    this.steps = steps;
    this.value = value;
    this.render();
  }

  render() {
    this.elem = createElement(
      `<div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress""></div>
        <div class="slider__steps">
        </div>
      </div>`
    );

    this.addSteps();
    this.variables();
    this.elem.addEventListener('click', this.changeValue);
  }

  addSteps() {
    const stepsWrapper = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      stepsWrapper.append(
        createElement(
          '<span></span>'
        )
      );
    };
  }

  variables() {
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderSteps = this.elem.querySelectorAll('.slider__steps span');

    this.sliderThumb.style.left = `${this.value/(this.steps - 1) * 100}%`;
    this.sliderValue.textContent = this.value + 1;
    this.sliderProgress.style.width = `${this.value/(this.steps - 1) * 100}%`;
    this.sliderSteps[this.value].classList.add('slider__step-active');
  }

  changeValue = (event) => {
    let newValue = Math.abs(Math.round(((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth).toFixed(2) * (this.steps - 1)));

    if (this.value != newValue) {
      this.sliderThumb.style.left = `${newValue/(this.steps - 1) * 100}%`;
      this.sliderValue.textContent = newValue + 1;
      this.sliderProgress.style.width = `${newValue/(this.steps - 1) * 100}%`;

      this.sliderSteps[newValue].classList.add('slider__step-active');
      this.sliderSteps[this.value].classList.remove('slider__step-active');

      this.value = newValue;

      let addEvent = new CustomEvent(
        "slider-change", {
          detail: newValue,
          bubbles: true}
      );

      this.elem.dispatchEvent(addEvent);
    }
  }
}
