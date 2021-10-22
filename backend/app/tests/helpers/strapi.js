const Strapi = require('strapi');
const http = require('http');

let instance;

/**
 * returns an array of basic permission values for setting role for a content type.
 * The default permissions include "find", "count", "findOne", "create", "update", and "delete"
 * @param {String} contentType contentType to get all basic permissions
 * @param {Array<String>} permissions endpoints, default to ["find", "count", "findOne", "create", "update", "delete"]
 * @returns an array of basic permission values for setting role
 */
const getPermissionValues = (contentType, permissions=["find", "count", "findOne", "create", "update", "delete"]) => {
  const base = `permissions.application.controllers.${contentType}.`;
  return permissions.map((permission) => base + permission);
};

async function setupStrapi() {
  if (!instance) {
    /** the following code in copied from `./node_modules/strapi/lib/Strapi.js` */
    await Strapi().load();
    instance = strapi; // strapi is global now
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
}

/**
 * Grants database `permissions` table that role can access an endpoint/controllers
 *
 * @param {int} roleID, 1 Autentihected, 2 Public, etc
 * @param {string} value, in form or dot string eg `"permissions.users-permissions.controllers.auth.changepassword"`
 * @param {boolean} enabled, default true
 * @param {string} policy, default ''
 */
const grantPrivilege = async (
  roleID = 1,
  value,
  enabled = true,
  policy = ""
) => {
  const updateObj = value
    .split(".")
    .reduceRight((obj, next) => ({ [next]: obj }), { enabled, policy });
  
  return await strapi.plugins[
    "users-permissions"
  ].services.userspermissions.updateRole(roleID, updateObj);
};

/** Updates database `permissions` that role can access an endpoint
 * @see grantPrivilege
 */

const grantPrivileges = async (roleID = 1, values = []) => {
  await Promise.all(values.map(val => grantPrivilege(roleID, val)));
};

module.exports = { setupStrapi, grantPrivileges, getPermissionValues };