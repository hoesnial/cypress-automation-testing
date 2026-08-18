describe('System Testing - Login Page TokoSatu', () => {
  beforeEach(() => {
    cy.visit('/index.php/login');
  });

  it('ST-01 menampilkan halaman login dengan judul dan elemen form yang benar', () => {
    cy.title().should('eq', 'Login - Toko Satu');
    cy.get('.logincontainer').should('be.visible');
    cy.get('h1').should('be.visible').and('contain.text', 'Login');
  });

  it('ST-02 memverifikasi keberadaan input email dan password pada form login', () => {
    cy.get('#inputEmail')
      .should('be.visible')
      .and('have.attr', 'type', 'email')
      .and('have.attr', 'name', 'username')
      .and('have.attr', 'placeholder', 'Enter email');
    cy.get('#inputPassword')
      .should('be.visible')
      .and('have.attr', 'type', 'password')
      .and('have.attr', 'name', 'password');
  });

  it('ST-03 memverifikasi tombol Login dan tautan Forgot Password', () => {
    cy.get('#login')
      .should('be.visible')
      .and('have.value', 'Login')
      .and('have.attr', 'type', 'submit');
    cy.get('.logincontainer a[href="/index.php/password/reset"]')
      .should('be.visible')
      .and('contain.text', 'Forgot Password?');
  });

  it('ST-04 memverifikasi checkbox Remember Me tersedia pada form', () => {
    cy.get('input[name="rememberme"]')
      .should('exist')
      .and('have.attr', 'type', 'checkbox');
    cy.get('input[name="rememberme"]')
      .parent('label')
      .should('contain.text', 'Remember Me');
  });

  it('ST-05 menolak login dengan credential kosong', () => {
    cy.get('#inputEmail').should('have.value', '');
    cy.get('#inputPassword').should('have.value', '');
    cy.get('#login').click();
    cy.url().should('include', '/index.php/login');
  });
});

describe('E2E Testing - Alur Login TokoSatu', () => {
  it('E2E-01 navigasi dari halaman utama ke halaman login melalui menu', () => {
    cy.visit('/index.php');
    cy.get('.top-nav a[href="/clientarea.php"]')
      .should('be.visible')
      .and('contain.text', 'Login')
      .click();
    cy.url().should('include', '/index.php/login');
    cy.get('h1').should('be.visible').and('contain.text', 'Login');
  });

  it('E2E-02 mengisi form login dengan data lalu memverifikasi nilai input', () => {
    cy.visit('/index.php/login');
    cy.get('#inputEmail')
      .type('testuser@example.com')
      .should('have.value', 'testuser@example.com');
    cy.get('#inputPassword')
      .type('password123')
      .should('have.value', 'password123');
    cy.get('input[name="rememberme"]').check().should('be.checked');
  });

  it('E2E-03 mengirim form login dengan credential salah dan memverifikasi respons error', () => {
    cy.visit('/index.php/login');
    cy.get('#inputEmail').type('wrong@example.com');
    cy.get('#inputPassword').type('salah123');
    cy.get('#login').click();
    cy.get('.logincontainer', { timeout: 10000 }).should('be.visible');
    cy.url().should('include', '/index.php/login');
  });

  it('E2E-04 menjalani alur login lupa password dari halaman login', () => {
    cy.visit('/index.php/login');
    cy.get('.logincontainer a[href="/index.php/password/reset"]')
      .should('be.visible')
      .and('contain.text', 'Forgot Password?')
      .click();
    cy.url().should('include', '/index.php/password/reset');
    cy.get('h1').should('be.visible');
    cy.get('#inputEmail')
      .should('be.visible')
      .and('have.attr', 'type', 'email');
  });
});
