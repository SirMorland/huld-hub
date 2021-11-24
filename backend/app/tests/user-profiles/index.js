const request = require("supertest");
const { roleSetup } = require("../../config/functions/roleSetup");
const { userSetup, findUserByUsername } = require("../../config/functions/userSetup");
const profileSetup = require("../../config/functions/profileSetup");
const { grantPrivileges, getPermissionValues } = require("../helpers/strapi");
const { DEFAULT_ROLES, DEFAULT_USERS, DEFAULT_PROFILES } = require("../../config/functions/defaultData");

describe("user-profiles api", () => {
  // before all tests set public rold to have access to find and create of comptences api
  beforeAll(async () => {
    await grantPrivileges(
      2,
      getPermissionValues("user-profiles", ["find", "findone", "create"])
    );
  });
  // clean up all competences
  afterAll(async () => {
    const dataProfile = await strapi.query("user-profiles").find();
    const promiseProfile = dataProfile.map(({ id }) =>
      strapi.services["user-profiles"].delete({ id })
    );
    await Promise.all(promiseProfile);

    const dataCompetences = await strapi.query("competences").find();
    const promiseCompetences = dataCompetences.map(({ id }) =>
      strapi.services["competences"].delete({ id })
    );
    await Promise.all(promiseCompetences);

    const dataCat = await strapi.query("competence-categories").find();
    const promiseCat = dataCat.map(({ id }) =>
      strapi.services["competence-categories"].delete({ id })
    );
    await Promise.all(promiseCat);
  });
  //
  it("should return user-profiles with get", async () => {
    let categoryData = {
      name: "Skills",
      description: "Skills",
    };
    let category = await strapi.services["competence-categories"].create(
      categoryData
    );

    let competenceData = {
      name: "PHP",
      description: "PHP",
      category: category.id,
    };
    const competence = await strapi.services["competences"].create(
      competenceData
    );

    const userData = {
      username: "test_user_profiles1",
      email: "test_user_profiles1@test.com",
      provider: "string",
      password: "123456",
      resetPasswordToken: "",
      confirmationToken: "",
      confirmed: false,
      blocked: false,
      role: "public",
      created_by: 1,
      updated_by: 1,
    };
    const user = await strapi.plugins["users-permissions"].services.user.add({
      ...userData,
    });

    const profileData = {
      first_name: "first name 1",
      last_name: "last name 1",
      title: "test 1",
      email: "test1@gmail.com",
      phone: "+358414736293",
      address: "Tampere",
      linkedin: "",
      github: "",
      slack: "",
      skills: "skills description 1",
      competences: [competence.id],
      bio: "bio 1",
      work_experiences: [
        {
          id: 1,
          company: "company 1",
          position: "position 1",
          start_date: "2021-10-20T12:36:25.893Z",
          end_date: "2021-10-20T12:36:25.893Z",
          description: "description 1",
        },
      ],
      education_histories: [
        {
          id: 1,
          school: "school 1",
          degree: "degree 1",
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          description: "description 1",
        },
      ],
      user: user.id,
      created_by: 1,
      updated_by: 1,
    };

    await strapi.services["user-profiles"].create(profileData);
    await request(strapi.server)
      .get("/user-profiles")
      .expect(200)
      .then((data) => {

        expect(data.body).toHaveLength(1);
        expect(data.body[0].first_name).toBe(profileData.first_name);
        expect(data.body[0].last_name).toBe(profileData.last_name);
        expect(data.body[0].title).toBe(profileData.title);
        expect(data.body[0].email).toBe(profileData.email);
        expect(data.body[0].work_experiences[0].id).toBe(
          profileData.work_experiences[0].id
        );
        expect(data.body[0].education_histories[0].id).toBe(
          profileData.education_histories[0].id
        );
        expect(data.body[0].competences[0].id).toBe(
          competence.id
        );
      });
  });
  //
  it("should return a user-profile with get", async () => {
    let categoryData = {
      name: "Positions",
      description: "Positions",
    };
    let category = await strapi.services["competence-categories"].create(
      categoryData
    );

    let competenceData = {
      name: "Web Dev",
      description: "Web Dev",
      category: category.id,
    };
    const competence = await strapi.services["competences"].create(
      competenceData
    );

    const userData = {
      username: "test_user_profiles2",
      email: "test_user_profiles2@test.com",
      provider: "string",
      password: "123456",
      resetPasswordToken: "",
      confirmationToken: "",
      confirmed: false,
      blocked: false,
      role: "public",
      created_by: 1,
      updated_by: 1,
    };
    const user = await strapi.plugins["users-permissions"].services.user.add({
      ...userData,
    });

    const profileData = {
      first_name: "first name 2",
      last_name: "last name 2",
      title: "test 2",
      email: "test2@gmail.com",
      phone: "+358414736293",
      address: "Helsinki",
      linkedin: "",
      github: "",
      slack: "",
      skills: "skills description 2",
      competences: [competence.id],
      bio: "bio 2",
      work_experiences: [
        {
          id: 2,
          company: "company 2",
          position: "position 2",
          start_date: "2021-10-20T12:36:25.893Z",
          end_date: "2021-10-20T12:36:25.893Z",
          description: "description 2",
        },
      ],
      education_histories: [
        {
          id: 2,
          school: "school 2",
          degree: "degree 2",
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          description: "description 2",
        },
      ],
      user: user.id,
      created_by: 1,
      updated_by: 1,
    };

    const profiles = await strapi.services["user-profiles"].create(profileData);
    await request(strapi.server)
      .get("/user-profiles/" + profiles.id)
      .expect(200)
      .then((data) => {
        expect(data.body.first_name).toBe(profileData.first_name);
        expect(data.body.last_name).toBe(profileData.last_name);
        expect(data.body.title).toBe(profileData.title);
        expect(data.body.email).toBe(profileData.email);
        expect(data.body.work_experiences[0].id).toBe(
          profileData.work_experiences[0].id
        );
        expect(data.body.education_histories[0].id).toBe(
          profileData.education_histories[0].id
        );
        expect(data.body.competences[0].id).toBe(
          competence.id
        );
      });
  });

  //
  it("should be able to add a user-profile", async () => {
    let categoryData = {
      name: "Positions",
      description: "Positions",
    };
    let category = await strapi.services["competence-categories"].create(
      categoryData
    );

    let competenceData = {
      name: "Web Dev",
      description: "Web Dev",
      category: category.id,
    };
    const competence = await strapi.services["competences"].create(
      competenceData
    );

    const userData = {
      username: "test_user_profiles3",
      email: "test_user_profiles3@test.com",
      provider: "string",
      password: "123456",
      resetPasswordToken: "",
      confirmationToken: "",
      confirmed: false,
      blocked: false,
      role: "public",
      created_by: 1,
      updated_by: 1,
    };
    const user = await strapi.plugins["users-permissions"].services.user.add({
      ...userData,
    });

    const profileData = {
      first_name: "first name 3",
      last_name: "last name 3",
      title: "test 3",
      email: "test1@gmail.com",
      phone: "+358414736293",
      address: "Tampere",
      linkedin: "",
      github: "",
      slack: "",
      skills: "skills description 3",
      competences: [competence.id],
      bio: "bio 3",
      work_experiences: [
        {
          id: 3,
          company: "company 3",
          position: "position 3",
          start_date: "2021-10-20T12:36:25.893Z",
          end_date: "2021-10-20T12:36:25.893Z",
          description: "description 3",
        },
      ],
      education_histories: [
        {
          id: 3,
          school: "school 1",
          degree: "degree 1",
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          description: "description 3",
        },
      ],
      user: user.id,
      created_by: 1,
      updated_by: 1,
    };

    await request(strapi.server)
      .post("/user-profiles")
      .send(profileData)
      .expect(200)
      .then((data) => {
        expect(data.body.first_name).toBe(profileData.first_name);
        expect(data.body.last_name).toBe(profileData.last_name);
        expect(data.body.title).toBe(profileData.title);
        expect(data.body.email).toBe(profileData.email);
        expect(data.body.work_experiences[0].id).toBe(
          profileData.work_experiences[0].id
        );
        expect(data.body.education_histories[0].id).toBe(
          profileData.education_histories[0].id
        );
        expect(data.body.competences[0].id).toBe(
          competence.id
        );
      });
  });
});

const removeAll = async (service, plugin) => {
  const data = await strapi.query(service, plugin).find();
  const promises = data.map(({ id }) =>
    strapi.query(service, plugin).delete({ id })
  );
  await Promise.all(promises);
};

describe("user-profiles", () => {
  let employee;
  let admin;

  beforeAll(async () => {
    await roleSetup([DEFAULT_ROLES.ADMIN, DEFAULT_ROLES.EMPLOYEE]);
    await userSetup(DEFAULT_USERS);
    await profileSetup(DEFAULT_PROFILES);
    employee = await findUserByUsername('huld-employee');
    admin = await findUserByUsername('huld-admin');
  });

  afterAll(async () => {
    removeAll("user", "users-permissions");
    removeAll("role", "users-permissions");
    removeAll("user-profiles");
  });

  it('should be editable by profile owner', async () => {
    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: employee.id,
    });
    const first_name = 'employee2';
    await request(strapi.server) // app server is an instance of Class: http.Server
      .put(`/user-profiles/${employee.profile.id}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + jwt)
      .send({ first_name })
      .expect(200)
      .then((data) => {
        expect(data.body.first_name).toBe(first_name);
      });
  });

  it('should be editable by an admin', async () => {
    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: admin.id,
    });
    const first_name = 'employee3';
    await request(strapi.server) // app server is an instance of Class: http.Server
      .put(`/user-profiles/${employee.profile.id}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + jwt)
      .send({ first_name })
      .expect(200)
      .then((data) => {
        expect(data.body.first_name).toBe(first_name);
      });
  });

  it('should not be editable by another employee', async () => {
    const jwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: employee.id,
    });
    await request(strapi.server) // app server is an instance of Class: http.Server
      .put(`/user-profiles/${admin.profile.id}`)
      .set("accept", "application/json")
      .set("Content-Type", "application/json")
      .set("Authorization", "Bearer " + jwt)
      .send({ first_name : 'hacked' })
      .expect(401);
  });
});
