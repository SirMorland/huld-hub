const request = require("supertest");
const { grantPrivileges, getPermissionValues } = require("../helpers/strapi");

describe("competences api", () => {
  // before all tests set public rold to have access to find and create of comptences api
  beforeAll(async () => {
    await grantPrivileges(
      2,
      getPermissionValues("competences", ["find", "findone", "create"])
    );
  });
  // clean up all competences
  afterAll(async () => {
    const data = await strapi.query("competences").find();
    const promises = data.map(({ id }) =>
      strapi.services["competences"].delete({ id })
    );
    await Promise.all(promises);

    const dataCat = await strapi.query("competence-categories").find();
    const promisesCat = dataCat.map(({ id }) =>
      strapi.services["competence-categories"].delete({ id })
    );
    await Promise.all(promisesCat);
  });
  //
  it("should return competences with get", async () => {
    const mockData = { name: "PHP", description: "PHP", category: "Skills" };

    await strapi.services["competences"].create(mockData);
    await request(strapi.server)
      .get("/competences")
      .expect(200)
      .then((data) => {
        expect(data.body).toHaveLength(1);
        expect(data.body[0].name).toBe(mockData.name);
      });
  });
  //
  it("should return a competence with get", async () => {
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
    await request(strapi.server)
      .get("/competences/" + competence.id)
      .expect(200)
      .then((data) => {
        expect(data.body.name).toBe(competenceData.name);
        expect(data.body.description).toBe(competenceData.description);
        expect(data.body.category.id).toBe(category.id);
      });
  });
  //
  it("should be able to add a competence", async () => {
    let categoryData = {
      name: "Skills",
      description: "Skills",
    };
    let resp = await strapi.services["competence-categories"].create(
      categoryData
    );

    const name = "HTML";
    const description = "HTML Skill Description";
    const category = resp.id;

    await request(strapi.server)
      .post("/competences")
      .send({ name, description, category })
      .expect(200)
      .then((data) => {
        expect(data.body.name).toBe(name);
        expect(data.body.description).toBe(description);
        expect(data.body.category.id).toBe(category);
      });
  });
});
