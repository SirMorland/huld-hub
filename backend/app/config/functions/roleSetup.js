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
  await roles.map(async (role) => {
    let customeRole = await findRoleByName(role.name);
    if (!customeRole) customeRole = await createRole(role);
    await enableApplicationPermissions(customeRole.id);
    console.log("ROLE DONE", role.name);
  });
  // no role provided will enable application permissions to every role, uncomment this to apply
  // await enableApplicationPermissions();
};

/**
 * A function that sets the default role for new users
 *
 * @param {{name: string; description: string, type: string}} default_role Default role object
 * @returns
 */
const defaultRoleSetup = async (default_role) => {
  // Try to get role
  const role = await strapi
    .query("role", "users-permissions")
    .findOne({ name: default_role.name });

  // Check if role exists
  if (!role) return;

  const pluginStore = await strapi.store({
    environment: "",
    type: "plugin",
    name: "users-permissions",
  });

  // Get the app settings configuration
  const settings = await pluginStore.get({
    key: "advanced",
  });

  // Check if role has been already assigned as default type
  if (role.type === settings.default_role) return;

  // Set the default role to the role type
  await pluginStore.set({
    key: "advanced",
    value: { ...settings, default_role: role.type },
  });
  console.log("DEFAULTROLE done");
};

module.exports = {
  findRoleByName,
  createRole,
  roleSetup,
  defaultRoleSetup,
};
