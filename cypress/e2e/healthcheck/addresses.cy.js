/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Testes de API e contrato de endereços", () => {
  let token;
  let id;
  let rua = faker.address.streetName;
  let bairro = faker.address.countryCode;
  let cidade = faker.address.city;
  let estado = faker.address.countryCode;
  let cep = faker.address.zipCode;
  let string = faker.random.alpha(10);

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

  it("deve criar novo endereço com sucesso", () => {
    cy.postAddresses(token, rua, bairro, cidade, estado, cep).then(
      (response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("id");
        expect(response.body.id).to.not.be.null;
      }
    );
  });

  it("deve buscar endereços cadastrados com sucesso", () => {
    cy.getAddresses(token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });

  it("deve buscar endereço por id com sucesso", () => {
    cy.getAddresses(token, id).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });

  it("deve atualizar um endereço com sucesso", () => {
    cy.postAddresses(token, id, rua, bairro, cidade, estado, cep).then(
      (response) => {
        expect(response.status).to.equal(201);
        expect(response.body.id).to.not.be.null;
      }
    );
  });

  it("deve buscar endereço por id vinculado a cliente com sucesso", () => {
    cy.getAddressesIdCustomers(token, id).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });

  it.only("deve criar adicionar informação no endereço por id vinculado a cliente", () => {
    cy.postAddressesIdCustomers(token, id, string).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.not.be.null;
    });
  });

  it("deve excluir um endereço com sucesso", () => {
    cy.deleteAddressesId(token, id).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
