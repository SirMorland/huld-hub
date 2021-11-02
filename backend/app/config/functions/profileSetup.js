const { findUserByUsername } = require("./userSetup");
const omit = require ("lodash/omit");

/**
 * find competences by names
 * @param {string[]} competences strings of competence names
 * @returns a promise that would resove in an array of strapi object competences
 */
const findCompetencesByNames = (competences) => {
  return strapi.query("competences").find({ name_in:  competences});
};

/**
 * find a profile that is attached to a user by user id
 * @param {string|number} user id of the user
 * @returns a promise that would resolves in the profile if it exists
 */
const findProfileByUserId = (user) => {
  return strapi.query("user-profiles").findOne({user});
};

/**
 * create a profile if it doesn't exist
 * @param {Object} data profile data
 * @param {Object} user strapi user object
 * @param {Array} competences an array of strapi object competences
 * @returns a promise that resolves in the profile
 */
const createProfileIfnExists = async (data, user , competences) => {
  let profile = await findProfileByUserId(user.id);
  if (profile) return profile;
  const params = {
    ...omit(data, ['username', competences]),
    user: user.id,
    competences: competences.map(({id})=>id),
  };
  return await strapi.query("user-profiles").create(params);
};

const setUpProfileRecursive = async (profiles, index, callback) => {
  const profile = profiles[index];
  const user = await findUserByUsername(profile.username);
  const competences = await findCompetencesByNames(profile.competences);
  await createProfileIfnExists(profile, user, competences);
  if (index + 1 === profiles.length) callback();
  else setUpProfileRecursive(profiles, index + 1, callback);
};

/**
 * create profiles if they don't exist based on the profiles models fed to the function
 * @param {Array} profiles array of profiles models to create
 */
const profileSetup = (profiles) => new Promise((resolve)=>{
  setUpProfileRecursive(profiles, 0, resolve);
});

module.exports = profileSetup;