const baseUrl = `https://outside-in-dev-api.herokuapp.com/**`;

describe('Creating a restaurant', () => {
  it('allows adding a restaurant', () => {
    const restaurantId = 27;
    const restaurantName = 'Sushi Place';

    cy.server({force404: true});

    cy.route({
      method: 'GET',
      url: `${baseUrl}/restaurants`,
      response: [],
    });
    cy.route({
      method: 'POST',
      url: `${baseUrl}/restaurants`,
      response: {
        id: restaurantId,
        name: restaurantName,
      },
    }).as('addRestaurant');

    cy.visit('/');

    cy.get('[placeholder="Add restaurant"]').type(restaurantName);
    cy.contains('Add').click();

    cy.wait('@addRestaurant')
      .its('requestBody')
      .should('deep.equal', {name: restaurantName});

    cy.contains(restaurantName);
  });
});
