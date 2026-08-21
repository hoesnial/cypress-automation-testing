class TokoSatuPage {
  routes = {
    home: '/toserba/',
    shop: '/toserba/shop/',
    product: '/toserba/product/kaos-keren/',
    cart: '/toserba/cart/',
    checkout: '/toserba/checkout/',
    account: '/toserba/my-account/',
  };

  selectors = {
    primaryMenu: '#top-menu',
    welcomeHeading: 'h2',
    productCard: 'li.product',
    productTitle: '.woocommerce-loop-product__title',
    productImage: 'li.product img',
    productDetailTitle: 'h1.product_title',
    quantity: 'input.qty',
    addToCartButton: 'button.single_add_to_cart_button',
    notification: '.woocommerce-message',
    cartForm: 'form.woocommerce-cart-form',
    cartProductName: '.cart_item .product-name',
    updateCartButton: 'button[name="update_cart"]',
    cartSubtotal: '.cart_item .product-subtotal',
    cartTotal: '.cart_totals .order-total',
    checkoutButton: '.checkout-button',
    checkoutForm: 'form.checkout',
    accountForm: 'form.woocommerce-form-login',
  };

  visit(route) {
    cy.visit(route);
  }

  visitHome() {
    this.visit(this.routes.home);
  }

  visitShop() {
    this.visit(this.routes.shop);
  }

  visitProduct() {
    this.visit(this.routes.product);
  }

  visitAccount() {
    this.visit(this.routes.account);
  }

  menuLink(label) {
    return cy.get(this.selectors.primaryMenu).contains('a', label);
  }

  productCard(productName) {
    return cy
      .contains(`${this.selectors.productCard} ${this.selectors.productTitle}`, productName)
      .parents(this.selectors.productCard);
  }

  openProduct(productName) {
    this.productCard(productName)
      .find('a.woocommerce-LoopProduct-link')
      .click();
  }

  setQuantity(quantity) {
    cy.get(this.selectors.quantity)
      .should('be.visible')
      .clear()
      .type(String(quantity))
      .should('have.value', String(quantity));
  }

  addToCart(quantity = 1) {
    if (quantity !== 1) {
      this.setQuantity(quantity);
    }

    cy.get(this.selectors.addToCartButton)
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.get(this.selectors.notification)
      .should('be.visible')
      .and('contain.text', 'has been added to your cart');
  }

  openCartFromNotification() {
    cy.get(this.selectors.notification)
      .contains('a', 'View cart')
      .should('be.visible')
      .click();

    cy.url().should('include', this.routes.cart);
  }

  addKaosToCartAndOpenCart() {
    this.visitProduct();
    this.addToCart();
    this.openCartFromNotification();
    cy.get(this.selectors.cartForm).should('be.visible');
  }

  updateCartQuantity(quantity) {
    this.setQuantity(quantity);

    cy.get(this.selectors.updateCartButton)
      .should('not.be.disabled')
      .click();

    cy.get(this.selectors.notification)
      .should('be.visible')
      .and('contain.text', 'Cart updated');
  }

  proceedToCheckout() {
    cy.get(this.selectors.checkoutButton)
      .should('be.visible')
      .click();
  }
}

export default new TokoSatuPage();
