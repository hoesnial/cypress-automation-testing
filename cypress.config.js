const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.member.tokosatu.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    reportPageTitle: 'Laporan Automation Testing - Demo TokoSatu',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: true,
    html: true,
    json: true,
  },
});
