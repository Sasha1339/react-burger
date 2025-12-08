Cypress.on('uncaught:exception', (err, runnable) => {
  // Игнорируем определенные ошибки если нужно
  return false
})

// Глобальные настройки
beforeEach(() => {
  // Можно добавить действия перед каждым тестом
  // Например, очистка localStorage
  // cy.clearLocalStorage()
})