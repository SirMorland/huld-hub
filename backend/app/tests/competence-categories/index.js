const request = require('supertest');
const { grantPrivileges, getPermissionValues } = require("../helpers/strapi");

const mockData = {name:'language'};

describe('competence-categories api', () => {
  // before all tests set public rold to have access to find and create of comptence-categories api
  beforeAll(async()=>{
    await grantPrivileges(2, getPermissionValues('competence-categories', ['find', 'create']));  
  });
  it('should return competence categories with get', async () => {
    await strapi.services['competence-categories'].create(mockData);
    await request(strapi.server) 
      .get('/competence-categories')
      .expect(200) 
      .then(data => {
        expect(data.body).toHaveLength(1);
        expect(data.body[0].name).toBe(mockData.name);
      });
  });
  it('should be able to add a competence category', async () => {
    const name = 'soft skills';
    const description = 'Skills that are soft';
    await request(strapi.server) 
      .post('/competence-categories').send({name, description})
      .expect(200)
      .then(data => {
        expect(data.body.name).toBe(name);
        expect(data.body.description).toBe(description);
      });    
  });
});
