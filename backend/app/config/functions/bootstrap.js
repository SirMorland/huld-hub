'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

const { roleSetup } = require('./roleSetup');
const { userSetup } = require('./userSetup');
const competenceSetup = require('./competenceSetup');
 
module.exports = async () => {
  if (process.env.NODE_ENV === 'development') {
    try {
      await roleSetup();
      await userSetup();
      await competenceSetup();
    } catch (e) {
      console.error('Something went wrong in bootstraping', e);
    }
  }
};
