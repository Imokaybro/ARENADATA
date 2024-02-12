const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "kcv1ty",

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
