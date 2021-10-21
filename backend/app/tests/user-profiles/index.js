const request = require("supertest");
const { grantPrivileges, getPermissionValues } = require("../helpers/strapi");

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
      name: "test 1",
      title: "test 1",
      email: "test1@gmail.com",
      phone: "+358414736293",
      address: "Tampere",
      linkedin: "",
      github: "",
      slack: "",
      work_experiences: [
        {
          id: 1,
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          title: "test 1",
          sub_title: "test 1",
          description: "test 1",
        },
      ],
      education_histories: [
        {
          id: 1,
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          title: "test 1",
          description: "test 1",
        },
      ],
      competences: [competence.id],
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
        expect(data.body[0].name).toBe(profileData.name);
        expect(data.body[0].work_experiences[0].id).toBe(
          profileData.work_experiences[0].id
        );
        expect(data.body[0].education_histories[0].id).toBe(
          profileData.education_histories[0].id
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
      name: "test 2",
      title: "test 2",
      email: "test1@gmail.com",
      phone: "+358414736293",
      address: "Tampere",
      linkedin: "",
      github: "",
      slack: "",
      work_experiences: [
        {
          id: 2,
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          title: "test 2",
          sub_title: "test 2",
          description: "test 2",
        },
      ],
      education_histories: [
        {
          id: 2,
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          title: "test 2",
          description: "test 2",
        },
      ],
      competences: [competence.id],
      user: user.id,
      created_by: 1,
      updated_by: 1,
    };
    const profiles = await strapi.services["user-profiles"].create(profileData);
    await request(strapi.server)
      .get("/user-profiles/" + profiles.id)
      .expect(200)
      .then((data) => {
        expect(data.body.name).toBe(profileData.name);
        expect(data.body.title).toBe(profileData.title);
        expect(data.body.email).toBe(profileData.email);
        expect(data.body.work_experiences[0].id).toBe(
          profileData.work_experiences[0].id
        );
        expect(data.body.education_histories[0].id).toBe(
          profileData.education_histories[0].id
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
      name: "test 3",
      title: "test 3",
      email: "test1@gmail.com",
      phone: "+358414736293",
      address: "Tampere",
      linkedin: "",
      github: "",
      slack: "",
      work_experiences: [
        {
          id: 3,
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          title: "test 3",
          sub_title: "test 3",
          description: "test 3",
        },
      ],
      education_histories: [
        {
          id: 3,
          from_date: "2021-10-20T12:36:25.893Z",
          to_date: "2021-10-20T12:36:25.893Z",
          title: "test 3",
          description: "test 3",
        },
      ],
      competences: [competence.id],
      user: user.id,
      created_by: 1,
      updated_by: 1,
    };
    await request(strapi.server)
      .post("/user-profiles")
      .send(profileData)
      .expect(200)
      .then((data) => {
        expect(data.body.name).toBe(profileData.name);
        expect(data.body.title).toBe(profileData.title);
        expect(data.body.email).toBe(profileData.email);
        expect(data.body.work_experiences[0].id).toBe(
          profileData.work_experiences[0].id
        );
        expect(data.body.education_histories[0].id).toBe(
          profileData.education_histories[0].id
        );
      });
  });
});
