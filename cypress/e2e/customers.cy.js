/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Testes de Health Check e Contrato de clientes", () => {
  let token;
  let id;

  before(() => {
    cy.token("admin", "admin").then((tkn) => {
      token = `Bearer ${tkn}`;
      cy.postAddresses(token, rua, bairro, cidade, estado, cep).then(
        (response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property("id");
          expect(response.body.id).to.not.be.null;
          id = response.body.id;
        }
      );
    });
  });

  it('deve adicionar cliente com sucesso', () => {
    //
  });
});
