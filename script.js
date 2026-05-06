class PathManager {
	static isCatalogPage() {
		return window.location.pathname.includes('catalog.html');
	}
	static getProductPath() {
		if (!PathManager.isProductPage())
			console.error("Невозможно определить товар, так как открыта другая страница");
		const fullPath = window.location.href
		return fullPath.substring(fullPath.indexOf("?") + 1);
	}
	static isProductPage() {
		return window.location.pathname.includes('product.html');
	}
	static isCartPage() {
		return window.location.pathname.includes('cart.html');
	}
}
class LocalStorageManager {
	static getData(key) {
		const data = localStorage.getItem(key)
		if (!data || data == '[]')
			return null
		try {
			return JSON.parse(data)
		}
		catch (error) {
			console.error(`Ошибка парсинга: ${error}. Загружен каталог по умолчанию`);
			return null
		}
	}
	static setData(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}
	static checkData(config) {
		for (const item of Object.entries(config.STORAGE_KEYS)) {
			if (!this.getData(item[1])) {
				this.setData(item[1], config[item[0]]);
			}
		}
	}
}
class Config {
	static get FILTERS() {
		return [
			{
				title: 'Категории',
				field: 'category',
				options: {
					ENGINE: 'Мотор',
					WHEELS: 'Колёса'
				}
			},
			{
				title: 'Состояние',
				field: 'state',
				options: {
					NEW: 'Новый',
					USED: 'Б/У'
				}
			}
		];
	}

	static get PRODUCTS() {
		return [
			{
				"id": "1",
				"name": "Блок цилиндров",
				"price": 20000,
				"image": "img/catalog/block.png",
				"alt": "Блок цилиндров двигателя",
				"shortDescription": "Оригинальный блок цилиндров от производителя АвтоВАЗ для двигателей 2108, 21083, 21084.",
				"description": "Изготовлен из высокопрочного чугуна методом литья в песчаные формы. Блок цилиндров прошел механическую обработку на современных станках, что гарантирует точность геометрических размеров и высокую надежность.",
				"specs": {
					"Производитель:": "АвтоВАЗ (Россия)",
					"Артикул:": "2108-1002015",
					"Материал:": "Чугун высокопрочный",
					"Количество цилиндров:": "4",
					"Рабочий объем:": "1.5 л (1500 см³)",
					"Диаметр цилиндра:": "82 мм"
				},
				"state": "NEW",
				"category": "ENGINE",
				"link": "block"
			},
			{
				"id": "2",
				"name": "Головка блока цилиндров",
				"price": 15000,
				"image": "img/catalog/head.jpg",
				"alt": "Головка блока цилиндров",
				"shortDescription": "ГБЦ для двигателей ВАЗ 2108-21099, 2110-2112. Каналы увеличенного сечения.",
				"description": "Алюминиевая головка блока с 8 клапанами. Обеспечивает улучшенное наполнение цилиндров и эффективное охлаждение. Подходит для тюнинга и стандартных двигателей. Клапаны и направляющие втулки в комплекте.",
				"specs": {
					"Производитель:": "АвтоВАЗ (Россия)",
					"Артикул:": "21083-1003011",
					"Материал:": "Алюминий",
					"Клапанов:": "8",
					"Высота:": "112.5 мм"
				},
				"state": "USED",
				"category": "ENGINE",
				"link": "cylinder-head"
			},
			{
				"id": "3",
				"name": "Коленвал для двигателя",
				"price": 10000,
				"image": "img/catalog/kolenval.jpg",
				"alt": "Коленвал для двигателя",
				"shortDescription": "Коленчатый вал для двигателей ВАЗ классика и Нива.",
				"description": "Новый коленвал из высокопрочной стали. Коренные и шатунные шейки прошли предварительную обработку. Требуется чистовое шлифование в ремонтный размер. Подходит для двигателей 2101-2106.",
				"specs": {
					"Производитель:": "АвтоВАЗ (Россия)",
					"Артикул:": "2106-1005015",
					"Материал:": "Сталь",
					"Ход поршня:": "80 мм",
					"Шеек коренных:": "5"
				},
				"state": "NEW",
				"category": "ENGINE",
				"link": "crankshaft"
			},
			{
				"id": "4",
				"name": "Поршень с шатуном в сборе",
				"price": 8000,
				"image": "img/catalog/porshen.jpg",
				"alt": "Поршень с шатуном в сборе",
				"shortDescription": "Комплект поршня с шатуном для одного цилиндра двигателя 2108.",
				"description": "Поршень из высококремнистого алюминиевого сплава в сборе с шатуном. В комплекте палец и стопорные кольца. Поршневые кольца приобретаются отдельно.",
				"specs": {
					"Производитель:": "АвтоВАЗ (Россия)",
					"Артикул:": "2108-1004015",
					"Материал поршня:": "Алюминий",
					"Диаметр:": "82 мм",
					"Длина шатуна:": "136 мм"
				},
				"state": "NEW",
				"category": "ENGINE",
				"link": "piston"
			},
			{
				"id": "5",
				"name": "Распредвал для двигателя",
				"price": 7000,
				"image": "img/catalog/raspredval.jpg",
				"alt": "Распредвал для двигателя",
				"shortDescription": "Распредвал для 8-клапанных двигателей ВАЗ. Спортивный профиль.",
				"description": "Распредвал с измененными фазами газораспределения. Обеспечивает прирост мощности на высоких оборотах. Кулачки закалены ТВЧ. Подходит для двигателей 2108-2110.",
				"specs": {
					"Производитель:": "АвтоВАЗ (Россия)",
					"Артикул:": "2108-1006010",
					"Материал:": "Чугун",
					"Фазы:": "270°",
					"Подъем клапана:": "9.5 мм"
				},
				"state": "NEW",
				"category": "ENGINE",
				"link": "camshaft"
			},
			{
				"id": "6",
				"name": "Колесо R15",
				"price": 7000,
				"image": "img/catalog/wheel.png",
				"alt": "Колесо",
				"shortDescription": "Легкосплавный диск R15 с летней резиной.",
				"description": "Готовое к установке колесо. Диск литой, шина Cordiant. Отбалансировано, вентили установлены. Подходит для ВАЗ, Лада, Гранта, Калина с разболтовкой 4×100.",
				"specs": {
					"Производитель:": "K&K / Cordiant",
					"Размер:": "R15",
					"Шина:": "195/65 R15",
					"Разболтовка:": "4×100",
					"Вылет (ET):": "45"
				},
				"state": "NEW",
				"category": "WHEELS",
				"link": "wheel"
			}
		];
	}

	static get STORAGE_KEYS() {
		return {
			PRODUCTS: 'products',
			FILTERS: 'filters',
			CART: 'cart',
			STORAGE_KEYS: 'storageKeys',
			PATHS: 'paths',
		};
	}
	static get CART() {
		return [];
	}

	static get PATHS() {
		return {
			CATALOG: 'catalog.html',
			PRODUCT: 'product.html'
		};
	}
}
class FilterCollection {
	constructor(filterConfig) {
		this.config = filterConfig;
		this.active = {};
		this.reset();
	}

	toggle(field, value) {
		const index = this.active[field].indexOf(value);
		if (index === -1) {
			this.active[field].push(value);
		} else {
			this.active[field].splice(index, 1);
		}
	}

	getActive() {
		return this.active;
	}

	reset() {
		for (const item of this.config) {
			this.active[item.field] = [];
		}
	}
}
class ProductCollection {
	constructor(products) {
		this.products = products;
	}
	filter(filters) {
		this.targetProducts = this.products;
		for (const item of Object.entries(filters)) {
			if (item[1].length > 0) {
				this.targetProducts = this.targetProducts.filter(product => {
					return item[1].includes(product[item[0]]);
				})
			}
		}
		return this.targetProducts;
	}
	getProductByLink(link) {
		return this.products.find(product => product.link === link) || null;
	}
	getProductById(id) {
		return this.products.find(product => product.id === id) || null;
	};
}
class CatalogRenderer {
	renderProducts(products) {
		const original = document.querySelector('.catalog__product.template');
		const parent = original.parentNode;
		parent.innerHTML = products.length === 0 ? `<p class="error-404">Ничего не найдено</p>` : '';
		parent.appendChild(original);
		for (let i = 0; i < products.length; i++) {
			const product = original.cloneNode(true);
			product.classList.remove('template');
			const img = product.querySelector('.product-catalog__img');
			img.alt = products[i].alt;
			img.src = products[i].image;
			const link = product.querySelector('.product-catalog__link');
			link.href += `?${products[i].link}`;
			link.innerHTML = products[i].name;
			product.querySelector('.product-catalog__price').innerHTML = products[i].price;
			parent.appendChild(product);
		}
	}
}
class ProductPageRenderer {
	renderProductPage(product) {
		const target = document.querySelector('.product__container');
		if (product !== null) {
			target.querySelector('.product__title').innerHTML = product.name;
			target.querySelector('.product__img-link').href = product.image;
			const image = target.querySelector('.product__img');
			image.alt = product.alt;
			image.src = product.image;
			target.querySelector('.product__price').innerHTML = product.price;
			target.querySelector('.product__short-description').innerHTML = product.shortDescription;
			target.querySelector('.product__description').innerHTML = product.description;

			const original = target.querySelector('.specs-list__item');
			const parentNode = original.parentNode;
			parentNode.innerHTML = '';
			for (const spec of Object.entries(product.specs)) {
				const specNode = original.cloneNode(true);
				specNode.querySelector('.specs-list__label').innerHTML = spec[0];
				specNode.querySelector('.specs-list__value').innerHTML = spec[1];
				parentNode.appendChild(specNode);
			}

			this.addBuyButtonHandler(product);
		} else {
			target.innerHTML = `<p class="error-404">Ошибка, товар не найден</p>`;
		}
	}
	addBuyButtonHandler(product) {
		const buyButton = document.querySelector('.product__buy');
		if (!buyButton) return;

		if (!this.cartCollection) {
			const productCollection = new ProductCollection(LocalStorageManager.getData('products'));
			const cartItems = LocalStorageManager.getData(Config.STORAGE_KEYS.CART) || [];
			this.cartCollection = new CartCollection(cartItems, productCollection);
		}

		const newBuyButton = buyButton.cloneNode(true);
		buyButton.parentNode.replaceChild(newBuyButton, buyButton);

		newBuyButton.addEventListener('click', (e) => {
			e.preventDefault();
			this.handleAddToCart(product);
		});
	}

	handleAddToCart(product) {
		this.cartCollection.addItem(product.id, 1);
		alert(`Товар "${product.name}" добавлен в корзину`);
	}
}
class FilterRenderer {
	constructor(filterCollection, productCollection, catalogRenderer) {
		this.filterCollection = filterCollection;
		this.filters = filterCollection.config;
		this.productCollection = productCollection;
		this.catalogRenderer = catalogRenderer;
	}
	renderFilters() {
		const original = document.querySelector('.item-filters');
		const parent = original.parentNode;
		original.remove();

		for (let i = 0; i < this.filters.length; i++) {
			const filter = original.cloneNode(true)
			filter.querySelector('.item-filters__title').innerHTML = this.filters[i].title;
			const originalLabel = filter.querySelector('.item-filters__checkbox');
			const labelParent = originalLabel.parentNode;
			originalLabel.remove();

			for (const option of Object.entries(this.filters[i].options)) {
				const label = originalLabel.cloneNode(true);
				label.querySelector('.checkbox__label').innerHTML = option[1];

				const input = label.querySelector('.checkbox__input');
				input.name = option[0];
				input.value = option[0];
				input.addEventListener('change', e => {
					this.filterCollection.toggle(this.filters[i].field, e.target.value);
					const activeFilters = this.filterCollection.getActive()
					const targetProducts = this.productCollection.filter(activeFilters);
					this.catalogRenderer.renderProducts(targetProducts);
				})

				labelParent.appendChild(label);
			}
			parent.appendChild(filter);
		}
	}
}
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

		cartGrid.innerHTML = '';

		if (cartItems.length === 0) {
			cartGrid.innerHTML = '<p class="cart__empty">Корзина пуста</p>';
			this.removeSummary();
			return;
		}

		const template = document.querySelector('.cart__item.template');

		cartItems.forEach(item => {
			this.renderCartItem(item, template, cartGrid);
		});

		this.renderSummary();
	}

	renderCartItem(itemData, template, parent) {
		const product = itemData.product;

		const cartItem = template.cloneNode(true);
		cartItem.classList.remove('template');

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

		const minusBtn = cartItem.querySelector('.cart__quantity-btn--minus');
		const plusBtn = cartItem.querySelector('.cart__quantity-btn--plus');
		const removeBtn = cartItem.querySelector('.cart__remove-btn');

		minusBtn.dataset.id = product.id;
		plusBtn.dataset.id = product.id;
		removeBtn.dataset.id = product.id;

		minusBtn.addEventListener('click', (e) => this.handleQuantityChange(e, 'minus'));
		plusBtn.addEventListener('click', (e) => this.handleQuantityChange(e, 'plus'));
		removeBtn.addEventListener('click', (e) => this.handleRemove(e));

		parent.appendChild(cartItem);
	}

	renderSummary() {
		this.removeSummary();

		const totalPrice = this.cartCollection.getTotalPrice();
		const totalItems = this.cartCollection.getTotalItems();

		const template = document.querySelector('.cart__summary-template');
		const summary = template.content.cloneNode(true);

		const totalItemsSpan = summary.querySelector('.cart__total-items');
		const totalPriceSpan = summary.querySelector('.cart__total-price');
		const checkoutBtn = summary.querySelector('.cart__checkout-btn');
		const clearBtn = summary.querySelector('.cart__clear-btn');

		totalItemsSpan.textContent = `Всего товаров: ${totalItems}`;
		totalPriceSpan.textContent = `Общая сумма: ${totalPrice} ₽`;

		checkoutBtn.addEventListener('click', () => this.handleCheckout());
		clearBtn.addEventListener('click', () => this.handleClearCart());

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
		this.renderCart();
	}

	handleRemove(event) {
		const productId = event.target.dataset.id;
		this.cartCollection.removeItem(productId);
		this.renderCart();
	}

	handleCheckout() {
		if (this.cartCollection.getTotalItems() === 0) {
			alert('Корзина пуста');
			return;
		}
		alert('Корзина оплачена! Спасибо за покупку!');
		this.cartCollection.clearCart();
		this.renderCart();
	}

	handleClearCart() {
		if (this.cartCollection.getTotalItems() === 0) {
			alert('Корзина уже пуста');
			return;
		}
		if (confirm('Вы уверены, что хотите очистить корзину?')) {
			this.cartCollection.clearCart();
			this.renderCart();
		}
	}
}


LocalStorageManager.checkData(Config)
const productCollection = new ProductCollection(LocalStorageManager.getData('products'));
if (!LocalStorageManager.getData(Config.STORAGE_KEYS.CART)) {
	LocalStorageManager.setData(Config.STORAGE_KEYS.CART, []);
}
if (PathManager.isCatalogPage()) {
	const openFilter = document.querySelector('.filter-open__img');
	const filter = document.querySelector('.filters');
	if (openFilter && filter)
		openFilter.addEventListener('click', e => {
			filter.classList.add('filters--active');
			document.querySelector('body').classList.add('lock');
		})
	const closeFilter = document.querySelector('.filters__close');
	if (closeFilter && filter)
		closeFilter.addEventListener('click', e => {
			filter.classList.remove('filters--active');
			document.querySelector('body').classList.remove('lock');
		})
	const filterCollection = new FilterCollection(LocalStorageManager.getData('filters'));
	const catalogRenderer = new CatalogRenderer();
	const filterRenderer = new FilterRenderer(filterCollection, productCollection, catalogRenderer);
	catalogRenderer.renderProducts(LocalStorageManager.getData('products'));
	filterRenderer.renderFilters()
}
if (PathManager.isProductPage()) {
	const productPageRenderer = new ProductPageRenderer();
	const product = productCollection.getProductByLink(PathManager.getProductPath());
	productPageRenderer.renderProductPage(product);
}

if (PathManager.isCartPage()) {
	const cartCollection = new CartCollection(
		LocalStorageManager.getData(Config.STORAGE_KEYS.CART),
		productCollection
	);
	const cartRenderer = new CartRenderer(cartCollection);
	cartRenderer.renderCart();
}


