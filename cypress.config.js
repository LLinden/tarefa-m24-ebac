const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: false,
      json: true,
    },
    baseUrl: "http://localhost:3000/api/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
