describe('service is available', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should bun drag and drop', function() {
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');
    cy.get('[class^=upBun]').first().as('upBun');
    cy.get('[class^=downBun]').first().as('downBun');

    const dataTransfer = new DataTransfer();

    cy.get('@upBun')
      .children()
      .should('have.length', 1);

    cy.get('@upBun')
      .children()
      .first()
      .should('contain', 'Выберите верхнюю булочку');

    cy.get('@downBun')
      .children()
      .should('have.length', 1);

    cy.get('@downBun')
      .children()
      .first()
      .should('contain', 'Выберите нижнюю булочку');

    cy.get('@productBun')
      .trigger('dragstart');


    cy.get('@upBun')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend')

    cy.get('@upBun')
      .children()
      .should('have.length', 1);

    cy.get('@upBun')
      .children()
      .first()
      .should('have.attr', 'class')
      .and('match', /^IngredientCardUI_/);

    cy.get('@downBun')
      .children()
      .should('have.length', 1);

    cy.get('@downBun')
      .children()
      .first()
      .should('have.attr', 'class')
      .and('match', /^IngredientCardUI_/);

  });

  it('should sauce drag and drop', function() {
    cy.get('[class^=IngredientUI_ingredient__]').eq(3).as('productSauce');
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');
    cy.get('[class^=BurgerConstructor_content__]').first().as('inner');

    cy.get('@inner')
      .children()
      .should('have.length', 1);

    cy.get('@inner')
      .children()
      .first()
      .should('contain', 'Выберите ингредиенты для вашей булочки');

    cy.get('@productSauce')
      .trigger('dragstart');

    cy.get('@inner')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');

    // dragend на исходном элементе
    cy.get('@productSauce')
      .trigger('dragend');

    cy.get('@inner')
      .children()
      .should('have.length', 1);

    cy.get('@inner')
      .children()
      .first()
      .should('have.attr', 'class')
      .and('match', /^IngredientCardUI_/);
  });

  it('should burger drag and drop', function() {
    cy.get('[class^=IngredientUI_ingredient__]').eq(3).as('productSauce');
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');

    cy.get('[class^=upBun]').first().as('upBun');
    cy.get('[class^=BurgerConstructor_content__]').first().as('inner');

    cy.get('@inner')
      .children()
      .should('have.length', 1);

    cy.get('@inner')
      .children()
      .first()
      .should('contain', 'Выберите ингредиенты для вашей булочки');

    cy.get('@upBun')
      .children()
      .should('have.length', 1);

    cy.get('@upBun')
      .children()
      .first()
      .should('contain', 'Выберите верхнюю булочку');

    cy.get('@productSauce')
      .trigger('dragstart');

    cy.get('@inner')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');

    // dragend на исходном элементе
    cy.get('@productSauce')
      .trigger('dragend');

    cy.get('@productBun')
      .trigger('dragstart');


    cy.get('@upBun')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend')

    cy.get('@upBun')
      .children()
      .should('have.length', 1);

    cy.get('@upBun')
      .children()
      .first()
      .should('have.attr', 'class')
      .and('match', /^IngredientCardUI_/);

    cy.get('@inner')
      .children()
      .should('have.length', 1);

    cy.get('@inner')
      .children()
      .first()
      .should('have.attr', 'class')
      .and('match', /^IngredientCardUI_/);
  });

  it('should price right', function() {
    cy.get('[class^=IngredientUI_ingredient__]').eq(3).as('productSauce');
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');
    cy.get('[class^=BurgerConstructor_price__]').first().as('price');
    cy.get('[class^=upBun]').first().as('upBun');
    cy.get('[class^=BurgerConstructor_content__]').first().as('inner');


    cy.get('@productSauce')
      .trigger('dragstart');

    cy.get('@inner')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');

    // dragend на исходном элементе
    cy.get('@productSauce')
      .trigger('dragend');

    cy.get('@productBun')
      .trigger('dragstart');


    cy.get('@upBun')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend')

    cy.get('@price')
      .children()
      .first()
      .should('contain', '2590')
  });

  it('should route login', function() {
    cy.get('[class^=IngredientUI_ingredient__]').eq(3).as('productSauce');
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');
    cy.get('[class^=BurgerConstructor_price__]').first().as('price');
    cy.get('[class^=button ]').first().as('button');
    cy.get('[class^=upBun]').first().as('upBun');
    cy.get('[class^=BurgerConstructor_content__]').first().as('inner');


    cy.get('@productSauce')
      .trigger('dragstart');

    cy.get('@inner')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');

    // dragend на исходном элементе
    cy.get('@productSauce')
      .trigger('dragend');

    cy.get('@productBun')
      .trigger('dragstart');


    cy.get('@upBun')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend')

    cy.get('@price')
      .children()
      .first()
      .should('contain', '2590')

    cy.get('@button')
      .click()

    cy.contains('Войти')
  });

  it('should open modal window with ingredient', function() {
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');

    cy.get('@productBun')
      .click()

    cy.contains('Детали ингредиента')
  });

  it('should close modal window with ingredient', function() {
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');


    cy.get('@productBun')
      .click()

    cy.contains('Детали ингредиента')

    cy.get('svg').first().as('closeButton');

    cy.get('@closeButton').click({force: true});

    cy.get('Детали ингредиента').should('not.exist');


  });

  it('should login', function() {
    cy.get('[class^=IngredientUI_ingredient__]').eq(3).as('productSauce');
    cy.get('[class^=IngredientUI_ingredient__]').first().as('productBun');
    cy.get('[class^=BurgerConstructor_price__]').first().as('price');
    cy.get('[class^=button ]').first().as('button');
    cy.get('[class^=upBun]').first().as('upBun');
    cy.get('[class^=BurgerConstructor_content__]').first().as('inner');


    cy.get('@productSauce')
      .trigger('dragstart');

    cy.get('@inner')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');

    // dragend на исходном элементе
    cy.get('@productSauce')
      .trigger('dragend');

    cy.get('@productBun')
      .trigger('dragstart');


    cy.get('@upBun')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop')
      .trigger('dragend')

    cy.get('@price')
      .children()
      .first()
      .should('contain', '2590')

    cy.get('@button')
      .click()

    cy.get('input').eq(0).type('samara@q1.q1');
    cy.get('input').eq(1).type('samara');

    cy.get('[class^=button ]').click();

    cy.wait(3000);

    cy.get('[class^=button ]').click();

    cy.wait(20000);
    cy.contains('идентификатор заказа')
  });

});