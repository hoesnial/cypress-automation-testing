# Tugas 8 - Praktik Automation Testing Cypress

Project ini menggunakan `https://www.member.tokosatu.com/` sebagai target web.

## Cakupan pengujian

- 5 test case System Testing untuk halaman login TokoSatu.
- 4 test case E2E untuk alur navigasi login dan lupa password.
- CSS Selector berbasis ID, class, atribut `href`, `name`, `type`, dan tag HTML.
- Assertion equality, visibility, dan state (`have.value`, `be.checked`, `have.attr`).
- Cypress automatic waiting dan retry-ability; tidak ada hardcoded wait seperti `cy.wait(5000)`.
- HTML dan JSON report menggunakan Mochawesome.

## Instalasi

Pastikan Node.js dan npm sudah tersedia, kemudian jalankan:

```bash
npm install
```

## Menjalankan test

Mode headless dan menghasilkan report:

```bash
npx cypress run
```

Mode browser interaktif:

```bash
npx cypress open
```

## Lokasi hasil report

Setelah test selesai, buka file HTML di folder:

```text
mochawesome-report/index.html
```

File spec utama berada di:

```text
cypress/e2e/auth/login_spec.cy.js
```

## Catatan skenario

Target yang digunakan adalah halaman login di `member.tokosatu.com`, bukan halaman katalog.
Test berfokus pada verifikasi elemen form login, validasi input, dan alur navigasi terkait
login seperti lupa password.

E2E-01 menguji navigasi dari halaman utama ke login melalui menu, E2E-02 memverifikasi
pengisian form dan state checkbox, E2E-03 menguji submit credential salah, dan
E2E-04 menguji alur dari login ke halaman lupa password.
