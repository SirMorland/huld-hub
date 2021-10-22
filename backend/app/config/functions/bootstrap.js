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


const { roleSetup, defaultRoleSetup } = require("./roleSetup");
const { userSetup } = require("./userSetup");
const { DEFAULT_ROLES, DEFAULT_USERS } = require("./default_data");

module.exports = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      await roleSetup([DEFAULT_ROLES.ADMIN, DEFAULT_ROLES.EMPLOYEE]);
      await userSetup(DEFAULT_USERS);
      await defaultRoleSetup(DEFAULT_ROLES.EMPLOYEE);
    } catch (e) {
      console.error("Something went wrong in bootstraping", e);
    }
  }
};
