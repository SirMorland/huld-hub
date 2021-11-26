const findRoleByName = (name) => {
  return strapi.query("role", "users-permissions").findOne({ name });
};

/**
 *
 * @param {{name: string; description: string; type: string}} role role object
 * @returns Promise that resolves into
 */
const createRole = async (role) => {
  await strapi.plugins["users-permissions"].services.userspermissions.createRole(role);
  await strapi.plugins["users-permissions"].services.userspermissions.updatePermissions();
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

const enableFindUsers = async (role) => {
  const permissionQuery = strapi.query("permission", "users-permissions");
  const { id } = await permissionQuery.findOne({
    role,
    type: "users-permissions",
    controller: "user",
    action: "find",
  });
  await permissionQuery.update({ id }, { enabled: true });
};

const enableUploadPermissions = async (role) => {
  const permissionQuery = strapi.query("permission", "users-permissions");
  const uploadPermission = await permissionQuery.findOne({
    type: "upload",
    action: "upload",
    role,
  });
  if (uploadPermission && permissionQuery) await permissionQuery.update({ id: uploadPermission.id }, { enabled: true });
};

/**
 * create admin and employee roles if they are not yet created
 * enable all application permissions to them
 *
 * @param {Array<{name: string; description: string, type: string}>} roles roles array to be created
 */
const roleSetup = async (roles) => {
  await Promise.all(roles.map(async (role) => {
    let customRole = await findRoleByName(role.name);
    if (!customRole) {
      await createRole(role);
      customRole = await findRoleByName(role.name);
    } 
    await enableApplicationPermissions(customRole.id);
    await enableUploadPermissions(customRole.id);
    if (role.canFindUsers) await enableFindUsers(customRole.id);
  }));
  // no role provided will enable application permissions to every role, uncomment this to apply
  // await enableApplicationPermissions();
};


module.exports = {
  findRoleByName,
  createRole,
  roleSetup,
};
