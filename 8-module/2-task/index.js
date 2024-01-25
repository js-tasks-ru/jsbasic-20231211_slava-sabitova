import createElement from '../../assets/lib/create-element.js';

import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner">

          <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->

        </div>
      </div>
    `);

    this.renderCards(this.products);
  }

  renderCards(products) {
    const productsGridInner = this.elem.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = '';

    for (let product of products) {
      productsGridInner.append(new ProductCard(product).elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    let products = this.products.filter(product => {

      // если true, то показываем товары без орехов
      if (this.filters.noNuts && product.nuts) return false;

      //если true, то показываем вегетарианские товары
      if (this.filters.vegeterianOnly && !product.vegeterian) return false;

      // число от 0 до 4 – показывать только те товары, у которых в свойстве spiciness число меньше или равное заданному
      if (this.filters.maxSpiciness < product.spiciness) return false;

      // filters.category – уникальный идентификатор категории – показывать только те товары, у которых в свойстве category такое же значение
      if (this.filters.category && product.category != this.filters.category) return false;

      return true;
    });

    this.renderCards(products);
  }
}
