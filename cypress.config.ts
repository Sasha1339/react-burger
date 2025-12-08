import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // можно добавить обработчики событий если нужно
      return config;
    },
    baseUrl: "http://localhost:3000", // базовая ссылка
    specPattern: "cypress/integration/**/*.spec.{js,jsx,ts,tsx}", // путь к тестам
    supportFile: "cypress/support/e2e.js", // файл поддержки
    viewportWidth: 1920, // увеличиваем ширину
    viewportHeight: 1080, // увеличиваем высоту
  },
});
