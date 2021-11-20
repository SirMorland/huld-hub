describe("Login", () => {
	beforeEach(() => {
		cy.fixture("user").as("user");

		Cypress.Cookies.preserveOnce("hub-jwt");
	});

	it("should show login page", function () {
		cy.visit("/");
		cy.contains("Log in to Hub");
	});

	it("should warn if wrong password", function () {
		const { email, incorrectPassword } = this.user;

		cy.get("input[name=email]").type(email);
		cy.get("input[name=password]").type(incorrectPassword);

		cy.get("button").click();

		cy.contains("Incorrect email or password!");
	});

	it("should login with correct credentials", function () {
		const { password, firstName, lastName } = this.user;

		cy.get("input[name=password]").clear().type(password);

		cy.get("button").click();

		cy.location("pathname").should("equal", "/");
		cy.contains(`${firstName.toLowerCase()} ${lastName.toLowerCase()}`);
	});
});