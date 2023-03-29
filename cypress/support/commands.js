Cypress.Commands.add("token", (usuario, senha) => {
  cy.request({
    method: "POST",
    url: "login",
    body: {
      username: usuario,
      password: senha,
    },
  }).then((response) => {
    expect(response.status).to.equal(201);
    return response.body.accessToken;
  });
});

Cypress.Commands.add(
  "postAddresses",
  (token, rua, bairro, cidade, estado, cep) => {
    cy.request({
      method: "POST",
      url: "addresses",
      headers: { authorization: token },
      body: {
        address_1: rua,
        address_2: bairro,
        city: cidade,
        state: estado,
        zip: cep,
      },
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add("getAddresses", (token) => {
  cy.request({
    method: "GET",
    url: "addresses",
    headers: { authorization: token },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("getAddressesId", (token, id) => {
    cy.request({
      method: "GET",
      url: `addresses/${id}`,
      headers: { authorization: token },
      failOnStatusCode: false,
    });
  });

  Cypress.Commands.add(
    "patchAddresses",
    (token, id, rua, bairro, cidade, estado, cep) => {
      cy.request({
        method: "PATCH",
        url: `addresses/${id}`,
        headers: { authorization: token },
        body: {
          address_1: rua,
          address_2: bairro,
          city: cidade,
          state: estado,
          zip: cep,
        },
        failOnStatusCode: false,
      });
    }
  );

  Cypress.Commands.add("deleteAddressesId", (token, id) => {
    cy.request({
      method: "DELETE",
      url: `addresses/${id}`,
      headers: { authorization: token },
      failOnStatusCode: false,
    });
  });

  Cypress.Commands.add("getAddressesIdCustomers", (token, id) => {
    cy.request({
      method: "GET",
      url: `addresses/${id}/customers`,
      headers: { authorization: token },
      failOnStatusCode: false,
    });
  });

  Cypress.Commands.add("postAddressesIdCustomers", (token, id, string) => {
    cy.request({
      method: "POST",
      url: `addresses/${id}/customers`,
      headers: { authorization: token },
      body: [string],
      failOnStatusCode: false,
    });
  });