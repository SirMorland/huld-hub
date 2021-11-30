const findRoleByName = (name) => {
  return strapi.query("role", "users-permissions").findOne({ name });
};

/**
 *
 * @param {{name: string; description: string; type: string}} role role object
 * @returns Promise that resolves into
 */
const createRole = async ({name, description, type}) => {
  await strapi.plugins["users-permissions"].services.userspermissions.createRole({name, description, type});
  await strapi.plugins["users-permissions"].services.userspermissions.updatePermissions();
};

/**
 * Apply permissions in the application to the role
 * @param {string} role roleId
 * @param {string} controller controller name
 * @param {Array<string>} actions actions to be enabled
 */
const enableApplicationPermissions = async (role, controller, actions) => {
  const permissionQuery = strapi.query("permission", "users-permissions");
  const applicationPermissions = await permissionQuery.find({
    type: "application",
    role,
    controller,
  });
  const filter = ({action}) => actions.includes(action);
  await Promise.all(
    applicationPermissions.filter(filter).map(({ id }) =>
      permissionQuery.update({ id }, { enabled: true })
    )
  );
};

const enableUsersPermissions = async (role, controller, action) => {
  const permissionQuery = strapi.query("permission", "users-permissions");
  const { id } = await permissionQuery.findOne({
    role,
    type: 'users-permissions',
    controller,
    action,
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
    await enableUploadPermissions(customRole.id);

    await enableApplicationPermissions(customRole.id, 'competence-categories', ['find']);
    if (role.applicationPermissions) {
      await Promise.all(
        role.applicationPermissions.map(async (permission) => {
          await enableApplicationPermissions(customRole.id, permission.controller, permission.actions);
        })
      );
    }
    if (role.usersPermissions) {
      await Promise.all(
        role.usersPermissions.map(async (permission) => {
          await enableUsersPermissions(customRole.id, permission.controller, permission.action);
        })
      );
    }
  }));
};


module.exports = {
  findRoleByName,
  createRole,
  roleSetup,
};
