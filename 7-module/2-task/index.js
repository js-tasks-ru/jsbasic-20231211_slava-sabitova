import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {

    this.render();

  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);

    this.modalTitle = this.elem.querySelector('.modal__title');
    this.modalBody = this.elem.querySelector('.modal__body');
    this.modalClose = this.elem.querySelector('.modal__close');

    this.modalClose.addEventListener('click', (event) => {
      if (event.target.closest('.modal__close')) {
        this.close();
      }
    });

    document.addEventListener('keydown', this.closeByEsc);};

  open = () => {
    let body = document.querySelector('body');
    body.append(this.elem);
    body.classList.add('is-modal-open');
  }

  setTitle = (title) => {
    this.modalTitle.textContent = title;
  }

  setBody = (node) => {
    this.modalBody.innerHTML = '';
    this.modalBody.append(node);
  }

  close = () => {
    document.querySelector('body').classList.remove('is-modal-open');
    this.elem.remove();
  }

  closeByEsc = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }

  }
}
