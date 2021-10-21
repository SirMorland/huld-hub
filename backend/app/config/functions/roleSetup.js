const ADMIN = 'admin';
const EMPLOYEE = 'employee';

const findRoleByName = (name) => {
  return strapi
    .query("role", "users-permissions")
    .findOne({name});
};

/**
 * 
 * @param {string} name role name
 * @param {string} description description
 * @returns Promise that resolves into the created role
 */
const createRole = (name, description) => {
  return strapi.query("role", "users-permissions")
    .create({
      name,
      description
    });
};

/**
 * Apply all permissions in the application to the role
 * @param {string} role roleId
 */
const enableApplicationPermissions = async (role) => {
  const permissionQuery = strapi.query("permission", "users-permissions");
  const applicationPermissions = await permissionQuery.find({ type: 'application', role});
  await Promise.all(applicationPermissions.map(({id})=> permissionQuery.update({id}, {enabled:true})));
};

/**
 * create admin and employee roles if they are not yet created
 * enable all application permissions to them
 */
const roleSetup = async () => {
  let adminRole = await findRoleByName(ADMIN);
  let employeeRole = await findRoleByName(EMPLOYEE);
  if (!adminRole) adminRole= await createRole(ADMIN, 'Admin user');
  if (!employeeRole) employeeRole = await createRole(EMPLOYEE, 'Employee user');
  await enableApplicationPermissions(adminRole.id);
  await enableApplicationPermissions(employeeRole.id);
  // no role provided will enable application permissions to every role, uncomment this to apply
  // await enableApplicationPermissions();
};

module.exports = {
  findRoleByName,
  createRole,
  roleSetup,
  ADMIN,
  EMPLOYEE,
};