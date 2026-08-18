const shopBasePath = '/simple-shop';

describe('System Testing - Demo TokoSatu katalog theme', () => {
  it('ST-01 menampilkan halaman utama dan header secara visible', () => {
    cy.visit('/');

    cy.title().should('eq', 'Demo Tokosatu | Demo Theme Website Tokosatu');
    cy.get('#main-header')
      .should('be.visible')
      .and('contain.text', 'Beranda');
  });

  it('ST-02 memverifikasi navigasi Beranda menggunakan atribut href', () => {
    cy.visit('/');

    cy.get('#top-menu-nav a')
      .first()
      .should('be.visible')
      .and('have.attr', 'href', 'https://demo.tokosatu.com');
  });

  it('ST-03 menampilkan theme Simple Shop Sayur pada katalog', () => {
    cy.visit('/');

    cy.get('#post-6')
      .should('be.visible')
      .within(() => {
        cy.contains('h2', 'Simple Shop Sayur')
          .should('be.visible')
          .and('have.text', 'Simple Shop Sayur');
        cy.get('a[href="https://demo.tokosatu.com/project/simple-shop-sayur/"]')
          .should('exist');
      });
  });

  it('ST-04 membuka detail theme dan menyediakan tautan Lihat Demo', () => {
    cy.visit('/project/simple-shop-sayur/');

    cy.url().should('include', '/project/simple-shop-sayur/');
    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'Simple Shop Sayur');
    cy.contains('a', 'Lihat Demo')
      .should('be.visible')
      .and('have.attr', 'href', `${Cypress.config('baseUrl')}/simple-shop/toko-sayur/`);
  });

  it('ST-05 memfilter katalog theme berdasarkan kategori Toko Online', () => {
    cy.visit('/project_category/toko-online/');

    cy.url().should('include', '/project_category/toko-online/');
    cy.get('h2').first().should('be.visible').and('have.text', 'Desain Theme');
    cy.contains('h2', 'Simple Shop Sayur').should('be.visible');
    cy.get('a[href="https://demo.tokosatu.com/project/simple-shop-sayur/"]')
      .should('be.visible');
  });
});

describe('E2E Testing - alur Simple Shop Sayur', () => {
  beforeEach(() => {
    // Mengisolasi state keranjang tiap test tanpa menambahkan hardcoded wait.
    cy.clearCookies();
  });

  it('E2E-01 menampilkan katalog produk dan mempertahankan pilihan kategori', () => {
    cy.visit(`${shopBasePath}/toko-sayur/`);

    cy.get('#woocommerce-product-search-field-0')
      .should('be.visible')
      .and('have.attr', 'type', 'search')
      .type('Susu')
      .should('have.value', 'Susu');
    cy.get('#product_cat')
      .should('be.visible')
      // Select2 menutupi select native; force hanya diperlukan untuk memilih
      // nilai pada kontrol native yang tetap menjadi sumber state form.
      .select('sayuran', { force: true })
      .should('have.value', 'sayuran');
    cy.get('ul.products li.product')
      .should('have.length.greaterThan', 0)
      .and('be.visible');
  });

  it('E2E-02 mengubah quantity dan memverifikasi state tombol Add to cart', () => {
    cy.visit(`${shopBasePath}/product/susu-kambing/`);

    cy.get('h1').should('be.visible').and('have.text', 'Susu Kambing');
    cy.get('form.cart input[name="quantity"]')
      .clear()
      .type('2')
      .should('have.value', '2');
    cy.get('form.cart button.single_add_to_cart_button')
      .should('be.enabled')
      .and('contain.text', 'Add to cart');
  });

  it('E2E-03 memverifikasi kondisi keranjang kosong', () => {
    cy.visit(`${shopBasePath}/cart/`);

    cy.url().should('include', '/simple-shop/cart/');
    cy.contains('Your cart is currently empty')
      .should('be.visible')
      .and('have.text', 'Your cart is currently empty.');
    cy.contains('a', 'Return to shop')
      .should('be.visible')
      .and('have.attr', 'href', `${Cypress.config('baseUrl')}/simple-shop/shop/`);
  });

  it('E2E-04 menjalankan alur katalog theme sampai item tampil di keranjang', () => {
    cy.visit('/');
    cy.get('a[href="https://demo.tokosatu.com/project/simple-shop-sayur/"]')
      .first()
      .click();
    cy.url().should('include', '/project/simple-shop-sayur/');

    cy.contains('a', 'Lihat Demo')
      .invoke('removeAttr', 'target')
      .click();
    cy.url().should('include', '/simple-shop/toko-sayur/');
    cy.get('ul.products li.product').should('have.length.greaterThan', 0);

    cy.get('a[href$="/simple-shop/product/susu-kambing/"]')
      .first()
      .click();
    cy.get('h1').should('be.visible').and('have.text', 'Susu Kambing');
    cy.get('form.cart button.single_add_to_cart_button').click();
    cy.contains('has been added to your cart').should('be.visible');

    cy.get('a.lwp_cart_module').first().click();
    cy.url().should('include', '/simple-shop/cart/');
    cy.get('tr.woocommerce-cart-form__cart-item')
      .should('be.visible')
      .and('contain.text', 'Susu Kambing');
    cy.get('a.checkout-button')
      .should('be.visible')
      .and('have.attr', 'href', `${Cypress.config('baseUrl')}/simple-shop/checkout/`);
  });
});
