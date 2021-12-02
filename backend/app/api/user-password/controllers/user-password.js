'use strict';

module.exports = {
  update: async (ctx) => {
    const { password } = ctx.request.body;
    return strapi.plugins["users-permissions"].services.user.edit(ctx.params, { password });
  }
};