const { findRoleByName, ADMIN, EMPLOYEE } = require('./roleSetup');

const ADMIN_CREDENTIAL = 'huld-admin';
const EMPLOYEE_CREDENTIAL = 'huld-employee';

/**
 * @param {string} username 
 * @returns a Promise that resolves a user object if found
 */

const findUserByUsername = (username) => {
  return strapi.query("user", "users-permissions")
    .findOne({ username });
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
  return strapi.query("user", "users-permissions")
    .create({
      username,
      email,
      password,
      role,
      confirmed: true,
    });
};

/**
 * Add huld-admin and huld-employee admin if not found
 */
const userSetup = async () => {
  let admin = await findUserByUsername(ADMIN_CREDENTIAL);
  let employee = await findUserByUsername(EMPLOYEE_CREDENTIAL);
  if (!admin) {
    const adminRole = await findRoleByName(ADMIN);
    await createUser(EMPLOYEE_CREDENTIAL, 'huld-admin@huld.io', EMPLOYEE_CREDENTIAL, adminRole.id);
  }
  if (!employee) {
    const employeeRole = await findRoleByName(EMPLOYEE);
    await createUser(ADMIN_CREDENTIAL, 'huld-employee@huld.io', ADMIN_CREDENTIAL, employeeRole.id);
  }
};

module.exports = {
  userSetup,
  findUserByUsername,
  createUser,
  EMPLOYEE_CREDENTIAL,
  ADMIN_CREDENTIAL
};