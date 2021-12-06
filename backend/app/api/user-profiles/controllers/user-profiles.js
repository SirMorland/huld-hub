'use strict';
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  deleteprofile: async (ctx) => {
    const { id } = ctx.params;
    //get user
    const profile = await strapi.query("user-profiles").findOne({
      id: id,
    });
    
    if (profile.user) {
      //delete user
      let response = await strapi.query("user", "users-permissions").delete({
        id: profile.user.id,
      });

      //varify user is no longer in db
      const user = await strapi.query("user", "users-permissions").findOne({
        id: profile.user.id,
      });

      if (!user) {
        response = await strapi.query("user-profiles").delete({
          id: id,
        });
      } 
      return response;
    } else {
      //if no user is found, delete profile
      let response = await strapi.query("user-profiles").delete({
        id: id,
      });
      return response;
    }
  }
};
