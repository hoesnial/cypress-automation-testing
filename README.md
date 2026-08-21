# Tugas 8 - Praktik Automation Testing Cypress

Project ini menggunakan `https://demo.tokosatu.com/toserba/` sebagai target web dan
mengadaptasi skenario manual testing Toserba: katalog, detail produk, keranjang,
My Account, responsive viewport, dan checkout.

## Cakupan pengujian

- 5 test case System Testing untuk homepage, katalog, detail produk, akun, dan responsive viewport.
- 4 test case E2E untuk alur katalog sampai checkout.
- Page Object Model pada `cypress/pages/TokoSatuPage.js`.
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

Menjalankan grouping System Testing saja:

```bash
npm run test:system
```

Menjalankan grouping E2E Testing saja:

```bash
npm run test:e2e
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

File test dikelompokkan berdasarkan jenisnya:

```text
cypress/e2e/system/tokosatu_system_spec.cy.js
cypress/e2e/e2e/shopping_flow_spec.cy.js
```

## Catatan skenario

Tidak ada hardcoded wait seperti `cy.wait(5000)`. Seluruh interaksi mengandalkan
automatic waiting dan retry-ability Cypress melalui command serta assertion chain.

ST-05 dan E2E-04 secara sengaja mendokumentasikan defect aktif dari laporan manual:
viewport membatasi zoom dan halaman checkout tidak menampilkan form. Test tersebut
akan gagal ketika defect sudah diperbaiki, sehingga assertion-nya perlu diubah menjadi
expected behavior baru pada regression cycle berikutnya.
