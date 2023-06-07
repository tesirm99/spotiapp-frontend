describe('e2e tests', () => {
  // it('register', () => {
  //   cy.visit('http://localhost:8100/tabs/tab1');
  //   cy.get('#tab-button-tab3').click();
  //   cy.get('.div-button-login > :nth-child(2)').click();
  //   cy.get(':nth-child(2) > .ng-untouched > .native-input').type('cypress1@gmail.com');
  //   cy.get(':nth-child(4) > .ng-untouched > .native-input').type('123456');
  //   cy.get('.div-button-login > :nth-child(1)').click();
  //   cy.get('.div-button-login > :nth-child(2)').click();
  // });

  it('login', () => {
    cy.visit('http://localhost:8100/tabs/tab1');
    cy.get('#tab-button-tab3').click();
    cy.get(':nth-child(2) > .ng-untouched > .native-input').type('cypress@gmail.com');
    cy.get(':nth-child(4) > .ng-untouched > .native-input').type('123456');
    cy.get('.div-button-login > :nth-child(1)').click();
  });

  it('insertSong', () => {
    cy.visit('http://localhost:8100/tabs/tab1');
    cy.get('#tab-button-tab3').click();
    cy.get(':nth-child(2) > .ng-untouched > .native-input').type('cypress@gmail.com');
    cy.get(':nth-child(4) > .ng-untouched > .native-input').type('123456');
    cy.get('.div-button-login > :nth-child(1)').click();
    cy.get('#insertBtn').click();
    cy.get(':nth-child(1) > .ng-untouched > .native-input').type('Cypress');
    cy.get(':nth-child(2) > .ng-untouched > .native-input').type('CypressArtist');
    cy.get(':nth-child(3) > .ng-untouched > .native-input').type('CypressAlbum');
    cy.get('#date').type('1999-01-11');
    cy.get(':nth-child(5) > .ng-untouched > .native-input').type('CypressGenre');
    cy.get(':nth-child(6) > .ng-untouched > .native-input').type('16');
    cy.get(':nth-child(7) > .ng-untouched > .native-input').type('CypressURL');
    cy.get(':nth-child(8) > .ng-untouched > .native-input').type('CypressImage');
    cy.get(':nth-child(9) > .ng-untouched > .native-input').type('10');
    cy.get('.formContainer > .form > div').click();
    cy.get('#submitBtn').click();
    
  });

  it('searchSong', () => {
    cy.visit('http://localhost:8100/tabs/tab1');
    cy.get('#tab-button-tab2').click();
    cy.get('#searchInput').type('Cypress');
    cy.get('#searchBtn').click();
    cy.wait(1000);
    cy.get(':nth-child(2) > div > .list-md > :nth-child(1) > .sc-ion-label-md-h > h2').contains('Cypress');
  })
})