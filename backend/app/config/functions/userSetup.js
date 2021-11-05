const { findRoleByName } = require("./roleSetup");

/**
 * @param {string} username
 * @returns a Promise that resolves a user object if found
 */

const findUserByUsername = (username) => {
  return strapi.query("user", "users-permissions").findOne({ username });
};

/**
 * Create a confirmed user into users-permissions plugin with the provided information.
 * @param {string} username
 * @param {string} email
 * @param {string} password
 * @param {string} role id of the role
 * @returns a Promise that would resolve a user object
 */
const createUser = (username, email, password, role) => {
  return strapi.query("user", "users-permissions").create({
    username,
    email,
    password,
    role,
    provider: 'local',
    confirmed: true,
  });
};

/**
 * Add huld-admin and huld-employee admin if not found
 *
 * @param {Array<{username: string; email: string; password: string; role: {name: string; description:string; type:string;}}>} users - Array of users to be created
 */
const userSetup = async (users) => {
  await Promise.all(users.map(async (user) => {
    let customUser = await findUserByUsername(user.username);
    if (!customUser) {
      const userRole = await findRoleByName(user.role.name);
      const password = await strapi.admin.services.auth.hashPassword(user.password);
      await createUser(user.username, user.email, password, userRole.id);
    }
  }));
};

module.exports = {
  userSetup,
  findUserByUsername,
  createUser,
};
