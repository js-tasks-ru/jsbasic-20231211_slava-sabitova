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
    this.elem.addEventListener('click', this.onclick);
    this.sliderThumb.addEventListener('pointerdown', this.onpointerdown);
  }

  addSteps() {
    const stepsWrapper = this.elem.querySelector('.slider__steps');
    for (let i = 0; i < this.steps; i++) {
      stepsWrapper.append(
        createElement('<span></span>')
      );
    }
  }

  variables() {
    this.sliderThumb = this.elem.querySelector('.slider__thumb');
    this.sliderValue = this.elem.querySelector('.slider__value');
    this.sliderProgress = this.elem.querySelector('.slider__progress');
    this.sliderSteps = this.elem.querySelectorAll('.slider__steps span');
    this.prevValue = this.value;

    this.sliderMove(this.value / (this.steps - 1));

    this.sliderThumb.ondragstart = () => false;
  }

  onclick = (event) => {
    this.changeValue(Math.round(((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth) * (this.steps - 1)) / (this.steps - 1));
  }

  onpointerdown = () => {
    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onpointermove);
    document.addEventListener('pointerup', this.onpointerup);
  }

  onpointermove = (event) => {
    this.sliderMove((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth);
  }

  onpointerup = (event) => {
    this.changeValue((event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth);

    this.elem.classList.remove('slider_dragging');
    document.removeEventListener('pointerup', this.onpointerup);
    document.removeEventListener('pointermove', this.onpointermove);
  }

  checkValue(value) {
    if (value < 0) {
      return 0;
    }
    else if (value > 1) {
      return 1;
    }
    return value;
  }

  sliderMove(value) {
    value = this.checkValue(value);

    this.sliderValue.textContent = Math.round(value * (this.steps - 1)) + 1;
    this.sliderProgress.style.width = value * 100 + '%';
    this.sliderThumb.style.left = value * 100 + '%';
    this.sliderSteps[this.prevValue].classList.remove('slider__step-active');
    this.prevValue = Math.round(value * (this.steps - 1));
    this.sliderSteps[Math.round(value * (this.steps - 1))].classList.add('slider__step-active');
  }

  changeValue(value) {
    value = Math.round(value * (this.steps - 1)) / (this.steps - 1);
    this.sliderMove(value);
    value = this.checkValue(value);

    if (value * (this.steps - 1) != this.value) {
      this.value = this.prevValue;

      let addEvent = new CustomEvent(
        "slider-change", {
          detail: Math.abs(value * (this.steps - 1)),
          bubbles: true}
      );
      this.elem.dispatchEvent(addEvent);
    }

  }
}
