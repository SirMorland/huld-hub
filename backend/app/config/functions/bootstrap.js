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

const DEFAULT_ROLES = [
  {
    name: "Admin",
    descripton: "Admin user",
    type: "admin",
  },
  {
    name: "Employee",
    descripton: "Employee user",
    type: "employee",
  },
];

const DEFAULT_USERS = [
  {
    username: "huld-admin",
    email: "huld-admin@huld.io",
    password: "huld-admin",
    role: "Admin" // Must match a role name 
  },
  {
    username: "huld-employee",
    email: "huld-employee@huld.io",
    password: "huld-employee",
    role: "Employee" // Must match a role name
  },
];

module.exports = async () => {
  if (process.env.NODE_ENV === "development") {
    try {
      await roleSetup(DEFAULT_ROLES);
      await userSetup(DEFAULT_USERS);
      await defaultRoleSetup(DEFAULT_ROLES.find((role) => role.name === "Employee"));
    } catch (e) {
      console.error("Something went wrong in bootstraping", e);
    }
  }
};
