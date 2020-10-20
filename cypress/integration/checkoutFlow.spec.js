describe('Test checkout flow', () => {
  it('Cart navigation works', () => {
    // Verify that the cart link works
    cy.visit('/cart');

    // Click to go to checkout
    cy.get('[data-cy=go-to-checkout-button]').click();
  });
});
