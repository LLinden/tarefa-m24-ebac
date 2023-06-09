/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
import postCustomers from "../contracts/customers/postCustomers.contract"
import getCustomers from "../contracts/customers/getCustomers.contract"
import getCustomersId from "../contracts/customers/getCustomersId.contract"
import patchCustomers from "../contracts/customers/patchCustomers.contract"
import deleteCustomers from "../contracts/customers/deleteCustomers.contract"

describe("Testes de Health Check e Contrato de clientes", () => {
  let token;
  let id;
  let customerid;
  let rua = faker.address.streetName();
  let bairro = faker.address.countryCode();
  let cidade = faker.address.city();
  let estado = faker.address.countryCode();
  let cep = Math.floor(Math.random() * 99999999);
  let email = faker.internet.email();
  let nome = faker.name.firstName();
  let sobrenome = faker.name.lastName();
  let telefone = faker.phone.number();

  before(() => {
    cy.token("admin", "admin").then((tkn) => {
      token = `Bearer ${tkn}`;
      cy.postAddresses(token, rua, bairro, cidade, estado, cep).then(
        (response) => {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property("id");
          expect(response.body.id).to.not.be.null;
          id = response.body.id;
          cy.postCustomers(token, id, email, nome, sobrenome, telefone).then(
            (response) => {
              expect(response.status).to.equal(201);
              expect(response.body).to.have.property("id");
              expect(response.body.id).to.not.be.null;
              customerid = response.body.id;
            }
          );
        }
      );
    });
  });

  it("deve adicionar cliente com sucesso", () => {
    cy.postCustomers(token, id, email, nome, sobrenome, telefone).then(
      (response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("id");
        expect(response.body.id).to.not.be.null;
        return postCustomers.validateAsync(response.body)
      }
    );
  });

  it("deve buscar clientes com sucesso", () => {
    cy.getCustomers(token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      return getCustomers.validateAsync(response.body)
    });
  });

  it("deve buscar cliente pelo id com sucesso", () => {
    cy.getCustomersId(token, customerid).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
      return getCustomersId.validateAsync(response.body)
    });
  });

  it("deve atualizar cliente com sucesso", () => {
    cy.patchCustomers(token, id, customerid, email, nome, sobrenome, telefone).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("id");
        expect(response.body.id).to.not.be.null;
        return patchCustomers.validateAsync(response.body)
      }
    );
  });

  it("deve excluir cliente pelo id com sucesso", () => {
    cy.deleteCustomerId(token, customerid).then((response) => {
      expect(response.status).to.equal(200);
      return deleteCustomers.validateAsync(response.body)
    });
  });

  it("deve buscar cliente pelo id vinculado a pedido", () => {
    cy.getCustomerIdOrders(token, customerid).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.not.be.null;
      return getCustomers.validateAsync(response.body)
    });
  });
});
