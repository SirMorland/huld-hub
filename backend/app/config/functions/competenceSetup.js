
const MODEL = [
  {
    category: 'coding languages',
    items: ['Javascript', 'Swift', 'Lua', 'Kotlin', 'CSS'],
  },
  {
    category: 'keywords',
    items: ['iOS', 'Android', 'macOS', 'Linux', 'REST'],
  },
  {
    category: 'skills',
    items: ['Mobile development', 'Team leading', 'UI/UX', 'Embedded systems']
  },
  {
    category: 'positions',
    items: ['Consulting', 'Tech lead Mobile Applications', 'Mobile Development']
  }
];

/**
 * createCategory if it doesnt exist
 * otherwise return the category
 * @param {string} name competence category name
 * @returns a promise that resolves into the created category
 */
const createCategoryIfnExist = async (name) => {
  const category = await strapi.query('competence-categories').findOne({name});
  if (category) return category; 
  else return await strapi.query('competence-categories').create({
    name
  });
};

/**
 * create a competence based on name and category if it doesnt exist
 * otherwise return the competence
 * @param {string} name competence name
 * @param {number|string} category id of the category
 * @returns a promise that resolves into the created competence
 */
const createCompetenceIfnExist = async (name, category) => {
  const competence = await strapi.query('competences').findOne({name});
  if (competence) return competence;
  else return await strapi.query('competences').create({
    name,
    category,
  });
};


/**
 * create categories and competences accordingly to MODEL if they do not exist
 */
const competenceSetup = async () => {
  MODEL.forEach(async ({category, items})=>{
    const { id } = await createCategoryIfnExist(category);
    await Promise.all(items.map(name => createCompetenceIfnExist(name,id)));
  });
};

module.exports = competenceSetup;