'use strict';

module.exports = {
   update: async (ctx) => {
    const { password } = ctx.request.body;
    ctx.request.body = { password: await strapi.admin.services.auth.hashPassword(password) };
    return strapi.plugins["users-permissions"].controllers.user.update(ctx);
  }
}; 