describe("Books website testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Books list").should("be.visible");
  });

  it("Log in with valid data", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать ").should("be.visible");
  });

  it("Log in with empty email", () => {
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Log in with empty password", () => {
    cy.login("test@test.com", "");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should add books", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Сто лет одиночества", "Габриэль Гарсиа Маркес");
    cy.contains("Поющие в терновнике").should("be.visible");
  });

  it("Should add book to favourite", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Унесенные ветром", "Маргарет Митчелл");
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Download checking", () => {
    cy.login("test@test.com", "test");
    cy.addBook("1984", "Джодж Оруэлл");
    cy.contains("1984").click();
    cy.contains("Dowload book").should("be.visible");
  });
});
