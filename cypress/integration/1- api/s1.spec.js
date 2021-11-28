/// <reference types="cypress" />

it("Purge DB", function () {
  cy.request({
    url: "/person",
    method: "PURGE",
  }).should((response) => {
    expect(response.status).to.eq(200);
  });
});


it("Get all yousers empty", function () {
  cy.request({
    url: "/person",
  })
    .its("body")
    .should((answer) => {
      expect(answer).to.deep.eq([]);
    });
});

it("Set wrong user", function () {
  cy.request({
    url: "/person",
    method: "POST",
    failOnStatusCode: false,
    body: {
      title: "Write wrong data",
    },
  }).should((response) => {
    expect(response.status).to.eq(400);
  });
});

it("Set current user", function () {
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

it("Get all users and it's not empty", function () {
  cy.request({
    url: "/person",
    method: "GET",
    failOnStatusCode: false,
  }).should((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.not.deep.eq([]);
  });
});
