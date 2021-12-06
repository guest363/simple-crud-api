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

it("Set current user 1", function () {
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
it("Set current user 2", function () {
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
it("Set current user 3", function () {
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

it("Get all person and it's 3", function () {
  cy.request({
    url: "/person",
    method: "GET",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.length).length.to.eq(3);
    /**
     * Set id of first person
     */
    id = response.body[0]?.id;
  });
});

it("Update person - invalid id", function () {
  cy.request({
    url: "/person/dsda",
    method: "PUT",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(400);
  });
});

it("Update person - valid id", function () {
  cy.request({
    url: `/person/${id}`,
    method: "PUT",
    body: {
      name: "Root",
      age: 12,
      hobbies: ["ttt"],
    },
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.property("name", "Root");
    expect(response.body).to.property("age", 12);
    expect(response.body).to.property("hobbies");
    expect(response.body).to.property("id", id);
  });
});
