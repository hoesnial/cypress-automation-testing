# Tugas 8 - Praktik Automation Testing Cypress

Project ini menggunakan `https://demo.tokosatu.com/` sebagai target web.

## Cakupan pengujian

- 5 test case System Testing untuk katalog theme Demo TokoSatu.
- 4 test case E2E untuk alur Simple Shop Sayur.
- CSS Selector berbasis ID, class, atribut `href`, `name`, dan tag HTML.
- Assertion equality, visibility, dan state (`have.value`, `be.enabled`, serta atribut).
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
mochawesome-report/mochawesome.html
```

File spec utama berada di:

```text
cypress/e2e/auth/login_spec.cy.js
```

## Catatan skenario

Target yang digunakan adalah katalog Demo TokoSatu dan subdemo Simple Shop Sayur,
bukan aplikasi login/dashboard. Karena itu, assertion URL disesuaikan dengan
path katalog, detail theme, produk, dan keranjang yang tersedia pada target.

E2E-02 memverifikasi perubahan quantity dan state tombol `Add to cart`, sedangkan
alur penambahan produk sampai keranjang diuji penuh pada E2E-04. Pemisahan ini
menjaga test tetap deterministik karena endpoint demo publik dapat mengalami
gangguan database sementara saat submit keranjang.
