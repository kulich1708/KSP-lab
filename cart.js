class CartItem {
	constructor(productId, quantity = 1) {
		this.productId = productId;
		this.quantity = quantity;
	}
}

class CartCollection {
	constructor(cartItems, productCollection) {
		this.items = cartItems || [];
		this.productCollection = productCollection;
	}

	addItem(productId, quantity = 1) {
		const existingItem = this.items.find(item => item.productId === productId);

		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			this.items.push(new CartItem(productId, quantity));
		}

		this.saveToStorage();
	}

	removeItem(productId) {
		this.items = this.items.filter(item => item.productId !== productId);
		this.saveToStorage();
	}

	updateQuantity(productId, quantity) {
		const item = this.items.find(item => item.productId === productId);
		if (item) {
			item.quantity = quantity;
			if (item.quantity <= 0) {
				this.removeItem(productId);
			} else {
				this.saveToStorage();
			}
		}
	}

	clearCart() {
		this.items = [];
		this.saveToStorage();
	}

	getTotalPrice() {
		return this.items.reduce((total, item) => {
			const product = this.productCollection.getProductById(item.productId);
			return total + (product ? product.price * item.quantity : 0);
		}, 0);
	}

	getTotalItems() {
		return this.items.reduce((total, item) => total + item.quantity, 0);
	}

	saveToStorage() {
		LocalStorageManager.setData(Config.STORAGE_KEYS.CART, this.items);
	}

	getCartItemsWithDetails() {
		return this.items.map(item => {
			const product = this.productCollection.getProductById(item.productId);
			return {
				...item,
				product: product
			};
		}).filter(item => item.product !== null);
	}
}

class CartRenderer {
	constructor(cartCollection) {
		this.cartCollection = cartCollection;
	}

	renderCart() {
		const cartGrid = document.querySelector('.catalog__grid');
		const cartItems = this.cartCollection.getCartItemsWithDetails();

		// Очищаем контейнер
		cartGrid.innerHTML = '';

		if (cartItems.length === 0) {
			cartGrid.innerHTML = '<p class="cart__empty">Корзина пуста</p>';
			this.removeSummary();
			return;
		}

		// Получаем шаблон
		const template = document.querySelector('.cart__item.template');

		// Рендерим каждый товар
		cartItems.forEach(item => {
			this.renderCartItem(item, template, cartGrid);
		});

		// Рендерим итоговую сумму
		this.renderSummary();
	}

	renderCartItem(itemData, template, parent) {
		const product = itemData.product;

		// Клонируем шаблон
		const cartItem = template.cloneNode(true);
		cartItem.classList.remove('template');

		// Заполняем данные
		const img = cartItem.querySelector('.product-catalog__img');
		img.src = product.image;
		img.alt = product.alt;

		const link = cartItem.querySelector('.product-catalog__link');
		link.href = `product.html?${product.link}`;
		link.textContent = product.name;

		const price = cartItem.querySelector('.product-catalog__price');
		price.textContent = `${product.price} ₽`;

		const quantitySpan = cartItem.querySelector('.cart__quantity-value');
		quantitySpan.textContent = itemData.quantity;

		const itemTotal = cartItem.querySelector('.cart__item-total');
		itemTotal.textContent = `Итого: ${product.price * itemData.quantity} ₽`;

		// Добавляем data-атрибуты для кнопок
		const minusBtn = cartItem.querySelector('.cart__quantity-btn--minus');
		const plusBtn = cartItem.querySelector('.cart__quantity-btn--plus');
		const removeBtn = cartItem.querySelector('.cart__remove-btn');

		minusBtn.dataset.id = product.id;
		plusBtn.dataset.id = product.id;
		removeBtn.dataset.id = product.id;

		// Добавляем обработчики
		minusBtn.addEventListener('click', (e) => this.handleQuantityChange(e, 'minus'));
		plusBtn.addEventListener('click', (e) => this.handleQuantityChange(e, 'plus'));
		removeBtn.addEventListener('click', (e) => this.handleRemove(e));

		parent.appendChild(cartItem);
	}

	renderSummary() {
		// Удаляем старую сумму
		this.removeSummary();

		const totalPrice = this.cartCollection.getTotalPrice();
		const totalItems = this.cartCollection.getTotalItems();

		// Получаем шаблон
		const template = document.querySelector('.cart__summary-template');
		const summary = template.content.cloneNode(true);

		// Заполняем данные
		const totalItemsSpan = summary.querySelector('.cart__total-items');
		const totalPriceSpan = summary.querySelector('.cart__total-price');
		const checkoutBtn = summary.querySelector('.cart__checkout-btn');
		const clearBtn = summary.querySelector('.cart__clear-btn');

		totalItemsSpan.textContent = `Всего товаров: ${totalItems}`;
		totalPriceSpan.textContent = `Общая сумма: ${totalPrice} ₽`;

		// Добавляем обработчики
		checkoutBtn.addEventListener('click', () => this.handleCheckout());
		clearBtn.addEventListener('click', () => this.handleClearCart());

		// Добавляем в DOM
		document.querySelector('.cart__container').appendChild(summary);
	}

	removeSummary() {
		const oldSummary = document.querySelector('.cart__summary');
		if (oldSummary) oldSummary.remove();
	}

	handleQuantityChange(event, action) {
		const productId = event.target.dataset.id;
		const cartItem = event.target.closest('.cart__item');
		const quantitySpan = cartItem.querySelector('.cart__quantity-value');
		let currentQuantity = parseInt(quantitySpan.textContent);

		if (action === 'minus' && currentQuantity > 1) {
			currentQuantity--;
		} else if (action === 'plus') {
			currentQuantity++;
		} else {
			return;
		}

		this.cartCollection.updateQuantity(productId, currentQuantity);
		this.refreshCart();
	}

	handleRemove(event) {
		const productId = event.target.dataset.id;
		this.cartCollection.removeItem(productId);
		this.refreshCart();
	}

	handleCheckout() {
		if (this.cartCollection.getTotalItems() === 0) {
			alert('Корзина пуста');
			return;
		}
		alert('Корзина оплачена! Спасибо за покупку!');
		this.cartCollection.clearCart();
		this.refreshCart();
	}

	handleClearCart() {
		if (this.cartCollection.getTotalItems() === 0) {
			alert('Корзина уже пуста');
			return;
		}
		if (confirm('Вы уверены, что хотите очистить корзину?')) {
			this.cartCollection.clearCart();
			this.refreshCart();
		}
	}

	refreshCart() {
		this.renderCart();
	}
}

// Добавляем метод для получения товара по ID в ProductCollection
ProductCollection.prototype.getProductById = function (id) {
	return this.products.find(product => product.id === id) || null;
};

if (PathManager.isCartPage()) {
	const cartCollection = new CartCollection(
		LocalStorageManager.getData(Config.STORAGE_KEYS.CART),
		productCollection
	);
	const cartRenderer = new CartRenderer(cartCollection);
	cartRenderer.renderCart();
}