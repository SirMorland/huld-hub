const request = require("supertest");
const { grantPrivileges, getPermissionValues } = require("../helpers/strapi");

// user mock data
const mockUserData = {
  username: "tester",
  email: "tester@real.io",
  provider: "local",
  password: "1234abc",
  confirmed: true,
  blocked: null,
};

const registeredUser = {
  username: "huldhub",
  email: "huldhub@real.io",
  password: "huldhub",
};

const badRegisteredUser = {
  username: "huldhub",
  email: "huldhub@fake.com",
  password: "huldhub",
};

describe("Login and Register User", () => {
  beforeAll(async () => {
    await grantPrivileges(
      2,
      getPermissionValues("user-profiles", ["find", "findone", "create"])
    );

    await strapi.query("email-domains").create({domain: "real.io", type: "external"});
  });
  // clean up all competences
  afterAll(async () => {
    const dataProfile = await strapi.query("user-profiles").find();
    const promiseProfile = dataProfile.map(({ id }) =>
      strapi.services["user-profiles"].delete({ id })
    );
    await Promise.all(promiseProfile);
  });


  it("should not register user with disallowed domain", async () => {

    // Get all users in the database
    const usersBeforeRegister = await strapi.plugins[
      "users-permissions"
    ].services.user.fetchAll();

    // Test that there is no user
    expect(usersBeforeRegister).toHaveLength(0);

    // mock send confirmation email because we don't have a real email service in the test
    strapi.plugins["users-permissions"].services.user.sendConfirmationEmail = jest.fn();
    // Make request to register endpoint
    await request(strapi.server) // app server is an instance of Class: http.Server
      .post("/auth/local/register")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send(badRegisteredUser)
      .expect("Content-Type", /json/)
      .expect(400);

    // Get the current number of users
    const usersAfterRegister = await strapi.plugins[
      "users-permissions"
    ].services.user.fetchAll();

    // Check that the number of users increased by 1
    expect(usersAfterRegister).toHaveLength(0);
  });

  it("should register new user", async () => {

    // Get all users in the database
    const usersBeforeRegister = await strapi.plugins[
      "users-permissions"
    ].services.user.fetchAll();

    // Test that there is no user
    expect(usersBeforeRegister).toHaveLength(0);

    // mock send confirmation email because we don't have a real email service in the test
    strapi.plugins["users-permissions"].services.user.sendConfirmationEmail = jest.fn();
    // Make request to register endpoint
    await request(strapi.server) // app server is an instance of Class: http.Server
      .post("/auth/local/register")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send(registeredUser)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        // Check that the registered users details match the expected result
        expect(data.body.user.username).toBe(registeredUser.username);
        expect(data.body.user.email).toBe(registeredUser.email);
        // expect(data.body.user.confirmed).toBe(null);
      });

    // Get the current number of users
    const usersAfterRegister = await strapi.plugins[
      "users-permissions"
    ].services.user.fetchAll();

    // Check that the number of users increased by 1
    expect(usersAfterRegister).toHaveLength(1);

    // Check that the registered users details in the database match the expected result
    expect(usersAfterRegister[0].username).toBe(registeredUser.username);
    expect(usersAfterRegister[0].email).toBe(registeredUser.email);
  });

  it("should generate a profile for the new user", async () => {
    await request(strapi.server)
      .get("/user-profiles")
      .expect(200)
      .then((data) => {
        
        expect(data.body).toHaveLength(1);
        expect(data.body[0].first_name).toBe(registeredUser.username);
        expect(data.body[0].last_name).toBe(null);
        expect(data.body[0].title).toBe(null);
        expect(data.body[0].email).toBe(registeredUser.email);
      });
  });

  it("should login user and return jwt token", async () => {
    /** Creates a new user and save it to the database */
    await strapi.plugins["users-permissions"].services.user.add({
      ...mockUserData,
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .post("/auth/local")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .send({
        identifier: mockUserData.email,
        password: mockUserData.password,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body.jwt).toBeDefined();
      });
  });

  it("should return users data for authenticated user", async () => {
    /** Gets the default user role */
    const defaultRole = await strapi
      .query("role", "users-permissions")
      .findOne({}, []);

    const role = defaultRole ? defaultRole.id : null;

    /** Creates a new user and push to database */
    const user = await strapi.plugins["users-permissions"].services.user.add({
      ...mockUserData,
      username: "tester2",
      email: "tester2@strapi.com",
      role,
    });

    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: user.id,
    });

    await request(strapi.server) // app server is an instance of Class: http.Server
      .get("/users/me")
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + jwt)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((data) => {
        expect(data.body).toBeDefined();
        expect(data.body.id).toBe(user.id);
        expect(data.body.username).toBe(user.username);
        expect(data.body.email).toBe(user.email);
      });
  });
});
