/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import postAddresses from "../contracts/addresses/postAddresses.contract";
import getAddresses from "../contracts/addresses/getAddresses.contract";
import patchAddresses from "../contracts/addresses/patchAddresses.contract";
import deleteAddresses from "../contracts/addresses/deleteAddresses.contract";


describe("Testes de Health Check e Contrato de endereços", () => {
  let token;
  let id;
  let rua = faker.address.streetName();
  let bairro = faker.address.countryCode();
  let cidade = faker.address.city();
  let estado = faker.address.countryCode();
  let cep = Math.floor(Math.random() * 99999999);
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
        return postAddresses.validateAsync(response.body)
      }
    );
  });

  it("deve buscar endereços cadastrados com sucesso", () => {
    cy.getAddresses(token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      return getAddresses.validateAsync(response.body)
    });
  });

  it("deve buscar endereço por id com sucesso", () => {
    cy.getAddresses(token, id).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      return getAddresses.validateAsync(response.body)
    });
  });

  it("deve atualizar um endereço com sucesso", () => {
    cy.patchAddresses(token, id, rua, bairro, cidade, estado, cep).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body.id).to.not.be.null;
        return patchAddresses.validateAsync(response.body)
      }
    );
  });

  it("deve buscar endereço por id vinculado a cliente com sucesso", () => {
    cy.getAddressesIdCustomers(token, id).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      return getAddresses.validateAsync(response.body)
    });
  });

  it("deve adicionar informação no endereço por id vinculado a cliente", () => {
    cy.postAddressesIdCustomers(token, id, string).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body).to.not.be.null;
      return postAddresses.validateAsync(response.body)
    });
  });

  it("deve excluir um endereço com sucesso", () => {
    cy.deleteAddressesId(token, id).then((response) => {
      expect(response.status).to.equal(200);
      return deleteAddresses.validateAsync(response.body)
    });
  });
});
