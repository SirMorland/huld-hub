describe("Registration", () => {
	beforeEach(() => {
		cy.fixture("user").as("user");

		Cypress.Cookies.preserveOnce("hub-jwt");
	});

	it("should show registration page", function () {
		cy.visit("/register");
		cy.contains("Register to Hub");
	});

	it("should warn if passwords don't match", function () {
		const { email, password, incorrectPassword } = this.user;

		cy.get("input[name=email]").type(email);
		cy.get("input[name=password]").type(password);
		cy.get("input[name=reEnterPassword]").type(incorrectPassword);

		cy.get("button").click();

		cy.contains("Passwords do not match! Please check");
	});

	it("should warn if email has wrong domain", function () {
		const { incorrectEmail, password } = this.user;

		cy.get("input[name=email]").clear().type(incorrectEmail);
		cy.get("input[name=reEnterPassword]").clear().type(password);

		cy.get("button").click();

		cy.contains("Please provide valid email address i.e youremail@huld.io");
	});

	it("should register with correct input", function () {
		const { email } = this.user;

		cy.get("input[name=email]").clear().type(email);

		cy.get("button").click();

		cy.location("pathname").should("equal", "/almost-done");
		cy.contains("Almost done");
		
		cy.getCookie("hub-jwt").should("exist");
	});

	it("should confirm email", function () {
		cy.wait(1000);

		cy.task("getEmail").then(email => {
			const [address] = email.match(/http[^<]+/);
			cy.visit(address);

			cy.location("pathname").should("equal", "/email-confirmed");
			cy.contains("Email confirmed");
			cy.contains("Log out");
		});
	});

	it("should go to profile page", function () {
		const { firstName, lastName } = this.user;

		cy.get("a:contains('Go to my profile')").click();

		cy.location("pathname").should("equal", "/");
		cy.contains(`${firstName.toLowerCase()} ${lastName.toLowerCase()}`);
	});

	it("should log out", function () {
		cy.get("button:contains('Log out')").click();

		cy.location("pathname").should("equal", "/login");
		cy.contains("Log in to Hub");
	});

	it("should warn email is already taken", function () {
		const { email, password } = this.user;
		
		cy.get("a:contains('Not Registered? Create an account')").click();

		cy.get("input[name=email]").type(email);
		cy.get("input[name=password]").type(password);
		cy.get("input[name=reEnterPassword]").type(password);

		cy.get("button").click();

		cy.contains("Email already taken!");
	});
});