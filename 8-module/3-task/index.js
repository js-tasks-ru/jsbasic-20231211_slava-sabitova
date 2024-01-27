export default class Cart {

  // список товаров
  cartItems = []; // [product: {...}, count: N]

  // обновляем количество товаров
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  // Добавляет товар в корзину
  addProduct(product) {
    if (!product || product === null) return;

    // Если товара еще нет в корзине, то добавить его в массив cartItems с количеством 1
    // Если товар уже есть в корзине, то увеличить его количество на единицу

    for (let item of this.cartItems) {
      if (item.product == product) {
        item.count++;
        this.onProductUpdate(item);
        return;
      }
    }

    this.cartItems.push({ product, count: 1 });
    this.onProductUpdate(this.cartItems.at(-1));
  }

  // меняет количество единиц товара
  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId);
    cartItem.count += amount;

    // удаляем товар из корзины

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  // Возвращает true, если корзина пустая и false, если в корзине есть хотя бы один товар.
  isEmpty() {
    return this.cartItems.length == 0;
  }

  // Возвращает общее количество товаров в корзине
  getTotalCount() {
    let totalCount = 0;

    for (let item of this.cartItems) {
      totalCount += item.count;
    }

    return totalCount;
  }

  // Возвращает стоимость всех товаров в корзине.
  getTotalPrice() {
    let totalPrice = 0;

    for (let item of this.cartItems) {
      totalPrice += (item.product.price * item.count);
    }

    return totalPrice;
  }

  // обновление количества товаров
  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

