// playwright.config.js
const config = {
    testDir: 'src/tests',
    timeout: 30000,
    use: { 
        headless: true,
        baseURL: 'http://localhost:5173',
    },
    extensions: ['.js', '.mjs'],
    testMatch: ['**/WeatherApplicationPlaywright.test.mjs']
};

export default config;
  