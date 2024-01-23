import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  // Отрисовать пустую иконку корзины - create empty cart icon

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  // Заполнить её данными из объекта cart - fill the cart with data from the cart object

  update(cart) {
    if (!cart.isEmpty()) {      // возвращает true, если корзина пуста и false, если нет
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      // getTotalCount() {}  Возвращает общее количество товаров в корзине

      // getTotalPrice() {}  Возвращает общую сумму всех товаров в корзине

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  // позиционировать иконку корзины на экране
  updatePosition() {
    if (this.elem.offsetHeight !== 0 && document.body.clientWidth >= 767) {

      if (document.body.getBoundingClientRect().top < 63) {

        // отступ слева от корзины
        let leftCartPosition = Math.min(

          // расстояние от правого края container + 20px
          document.querySelector('.container').getBoundingClientRect().right + 20,

          // общая ширина страницы минус ширина иконки корзины и размер отступа от правого края (10px)
          document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';

        this.elem.style.position = "fixed";
        this.elem.style.zIndex = "99999";
        this.elem.style.right = "10px";              // отступ от правого края экрана
        this.elem.style.left = leftCartPosition;

      // вернуть как было, когда пользователь докрутил обратно до верха
      } else {
        Object.assign(this.elem.style, {
          position: '',
          top: '',
          left: '',
          zIndex: ''
        });
      }
    }

  }
}
