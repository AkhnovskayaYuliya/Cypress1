describe("Books website testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Books list").should("be.visible");
  });

  it("Log in with valid data", () => {
    cy.login("bropet@mail.ru", "123");
    cy.contains("Добро пожаловать ").should("be.visible");
  });

  it("Log in with empty email", () => {
    cy.login(" ", "123");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Log in with empty password", () => {
    cy.login("bropet@mail.ru", "");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should add books", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook("Сто лет одиночества", "Габриэль Гарсиа Маркес");
    cy.contains("Поющие в терновнике").should("be.visible");
  });

  it("Should add book to favourite", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook("Унесенные ветром", "Маргарет Митчелл");
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Download checking", () => {
    cy.login("bropet@mail.ru", "123");
    cy.addBook("1984", "Джодж Оруэлл");
    cy.contains("1984").click();
    cy.contains("Dowload book").should("be.visible");
  });
});
