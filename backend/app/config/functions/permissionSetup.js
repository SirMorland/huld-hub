const findPublicRole = () => {
  return strapi
    .query("role", "users-permissions")
    .findOne({type: "public"});
};

const setPermission = (id, value) => {
  return strapi
    .query("permission", "users-permissions")
    .update({id}, value);
};

const permissionSetup = async () => {
  const role = await findPublicRole();
  
  await Promise.all(role.permissions.map(permission => {
    let promises = [];

    switch(permission.controller) {
      case 'ping':
        promises.push(setPermission(permission.id, {enabled: true}));
        break;
      default:
        break;
    }

    return promises;
  }));
};

module.exports = {
  permissionSetup
};