import tokoSatuPage from '../../pages/TokoSatuPage';

describe('E2E Testing - Alur Belanja Toserba Demo TokoSatu', () => {
  it('E2E-01 navigasi dari homepage ke katalog melalui menu Produk', () => {
    tokoSatuPage.visitHome();

    tokoSatuPage.menuLink('Produk')
      .should('be.visible')
      .and('have.attr', 'href')
      .and('include', tokoSatuPage.routes.shop);
    tokoSatuPage.menuLink('Produk').click();

    cy.url().should('include', tokoSatuPage.routes.shop);
    tokoSatuPage.productCard('Kaos Keren').should('be.visible');
  });

  it('E2E-02 membuka detail Kaos Keren dari katalog', () => {
    tokoSatuPage.visitShop();
    tokoSatuPage.openProduct('Kaos Keren');

    cy.url().should('include', tokoSatuPage.routes.product);
    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'Kaos Keren');
    cy.get(tokoSatuPage.selectors.addToCartButton).should('be.enabled');
  });

  it('E2E-03 menambah produk, mengubah jumlah menjadi 2, dan memverifikasi total', () => {
    tokoSatuPage.addKaosToCartAndOpenCart();

    cy.get(tokoSatuPage.selectors.cartProductName)
      .should('be.visible')
      .and('contain.text', 'Kaos Keren');
    tokoSatuPage.updateCartQuantity(2);

    cy.get(tokoSatuPage.selectors.cartSubtotal)
      .should('be.visible')
      .and('contain.text', 'Rp400,000.00');
    cy.get(tokoSatuPage.selectors.cartTotal)
      .should('be.visible')
      .and('contain.text', 'Rp400,000.00');
  });

  it('E2E-04 [DEF003] mendeteksi halaman checkout kosong setelah cart terbentuk', () => {
    tokoSatuPage.addKaosToCartAndOpenCart();
    tokoSatuPage.proceedToCheckout();

    cy.url().should('include', tokoSatuPage.routes.checkout);
    cy.get('body').should('have.class', 'woocommerce-checkout');
    cy.get(tokoSatuPage.selectors.checkoutForm).should('not.exist');
    cy.get('#main-content').should(($mainContent) => {
      expect($mainContent.text().trim()).to.eq('');
    });
  });
});
