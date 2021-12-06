/// <reference types="cypress" />
let id;

it("Purge DB", function () {
  cy.request({
    url: "/person",
    method: "PURGE",
  }).should((response) => {
    expect(response.status).to.eq(200);
  });
});

it("Set current person", function () {
  cy.request({
    url: "/person",
    method: "POST",
    failOnStatusCode: false,
    body: {
      name: "Oleg",
      age: 31,
      hobbies: ["game"],
    },
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.property("name", "Oleg");
    expect(response.body).to.property("age", 31);
    expect(response.body).to.property("hobbies");
    expect(response.body).to.property("id");
  });
});

it("Get all persons", function () {
  cy.request({
    url: "/person",
    method: "GET",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(200);
    id = response.body[0]?.id;
    console.log(id);
  });
});

it("Delete person by incorrect id", function () {
  cy.request({
    url: `/person/${id}false`,
    method: "DELETE",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(404);
  });
});

it("Delete person by correct id", function () {
  cy.request({
    url: `/person/${id}`,
    method: "DELETE",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(204);
  });
});

it("Get all persons", function () {
  cy.request({
    url: "/person",
    method: "GET",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.deep.eq([]);
  });
});
