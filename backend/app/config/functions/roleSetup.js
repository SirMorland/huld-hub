const findRoleByName = (name) => {
  return strapi.query("role", "users-permissions").findOne({ name });
};

/**
 *
 * @param {{name: string; description: string; type: string}} role role object
 * @returns Promise that resolves into
 */
const createRole = (role) => {
  return strapi.query("role", "users-permissions").create(role);
};

/**
 * Apply all permissions in the application to the role
 * @param {string} role roleId
 */
const enableApplicationPermissions = async (role) => {
  const permissionQuery = strapi.query("permission", "users-permissions");
  const applicationPermissions = await permissionQuery.find({
    type: "application",
    role,
  });
  await Promise.all(
    applicationPermissions.map(({ id }) =>
      permissionQuery.update({ id }, { enabled: true })
    )
  );
};

/**
 * create admin and employee roles if they are not yet created
 * enable all application permissions to them
 *
 * @param {Array<{name: string; description: string, type: string}>} roles roles array to be created
 */
const roleSetup = async (roles) => {
  await Promise.all(roles.map(async (role) => {
    let customeRole = await findRoleByName(role.name);
    if (!customeRole) customeRole = await createRole(role);
    await enableApplicationPermissions(customeRole.id);
  }));
  // no role provided will enable application permissions to every role, uncomment this to apply
  // await enableApplicationPermissions();
};


module.exports = {
  findRoleByName,
  createRole,
  roleSetup,
};
