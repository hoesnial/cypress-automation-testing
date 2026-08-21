import tokoSatuPage from '../../pages/TokoSatuPage';

describe('System Testing - Toserba Demo TokoSatu', () => {
  it('ST-01 menampilkan homepage dengan title dan heading utama yang benar', () => {
    tokoSatuPage.visitHome();

    cy.title().should('eq', 'Template Toserba | Demo Theme Website Tokosatu');
    cy.contains(tokoSatuPage.selectors.welcomeHeading, 'Selamat Datang')
      .should('be.visible')
      .and('contain.text', 'Selamat Datang');
  });

  it('ST-02 menampilkan katalog dan data produk Kaos Keren', () => {
    tokoSatuPage.visitShop();

    cy.url().should('include', tokoSatuPage.routes.shop);
    tokoSatuPage.productCard('Kaos Keren')
      .should('be.visible')
      .within(() => {
        cy.get('.price')
          .should('be.visible')
          .and('contain.text', 'Rp200,000.00');
      });
  });

  it('ST-03 memverifikasi equality dan state pada halaman detail produk', () => {
    tokoSatuPage.visitProduct();

    cy.get('h1')
      .should('be.visible')
      .and('have.text', 'Kaos Keren');
    cy.get(tokoSatuPage.selectors.quantity)
      .should('have.value', '1')
      .and('have.attr', 'min', '1');
    cy.get(tokoSatuPage.selectors.addToCartButton)
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('ST-04 memverifikasi form My Account dan state checkbox Remember me', () => {
    tokoSatuPage.visitAccount();

    cy.get(tokoSatuPage.selectors.accountForm).should('be.visible');
    cy.get('#username')
      .should('be.visible')
      .and('have.value', '');
    cy.get('#password')
      .should('be.visible')
      .and('have.attr', 'type', 'password');
    cy.get('#rememberme')
      .check()
      .should('be.checked');
  });

  it('ST-05 [DEF005] mendeteksi viewport mobile yang membatasi zoom', () => {
    cy.viewport(375, 667);
    tokoSatuPage.visitShop();

    cy.get('meta[name="viewport"]')
      .should('have.attr', 'content')
      .and('include', 'maximum-scale=1.0')
      .and('include', 'user-scalable=0');
    cy.get('body').should('be.visible');
  });
});
