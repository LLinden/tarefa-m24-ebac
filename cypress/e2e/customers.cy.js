/// <reference types="cypress" />
import { faker } from "@faker-js/faker";

describe("Testes de Health Check e Contrato de clientes", () => {
  let token;
  let id;
  let customerid;
  let rua = faker.address.streetName();
  let bairro = faker.address.countryCode();
  let cidade = faker.address.city();
  let estado = faker.address.countryCode();
  let cep = Math.floor(Math.random() * 99999999);
  let string = faker.random.alpha(10);
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
      }
    );
  });

  it("deve buscar clientes com sucesso", () => {
    cy.getCustomers(token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });

  it("deve buscar cliente pelo id com sucesso", () => {
    cy.getCustomersId(token, customerid).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.not.be.null;
    });
  });

  it("deve atualizar cliente com sucesso", () => {
    cy.patchCustomers(token, id, customerid, email, nome, sobrenome, telefone).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("id");
        expect(response.body.id).to.not.be.null;
      }
    );
  });

  it.only("deve excluir cliente pelo id com sucesso", () => {
    cy.deleteCustomerId(token, customerid).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
