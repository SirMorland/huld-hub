"use strict";

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */


const { permissionSetup } = require('./permissionSetup');
const { roleSetup, defaultRoleSetup } = require("./roleSetup");
const { userSetup } = require("./userSetup");
const { DEFAULT_ROLES, DEFAULT_USERS, DEFAULT_COMPETENCES, DEFAULT_PROFILES } = require("./default_data");
const competenceSetup = require('./competenceSetup');
const profileSetup = require('./profileSetup');

module.exports = async () => {
  await permissionSetup();
  await roleSetup([DEFAULT_ROLES.ADMIN, DEFAULT_ROLES.EMPLOYEE]);
  await defaultRoleSetup(DEFAULT_ROLES.EMPLOYEE);

  if (process.env.NODE_ENV === "development") {
    try {
      await userSetup(DEFAULT_USERS);
      await competenceSetup(DEFAULT_COMPETENCES);
      await profileSetup(DEFAULT_PROFILES);
    } catch (e) {
      console.error("Something went wrong in bootstraping", e);
    }
  }
};
