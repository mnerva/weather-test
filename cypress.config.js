export default {
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
};