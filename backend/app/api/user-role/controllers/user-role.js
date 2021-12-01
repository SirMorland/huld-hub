'use strict';

module.exports = {
  update: (ctx) => {
    const { role } = ctx.request.body;
    ctx.request.body = { role };
    return strapi.plugins["users-permissions"].controllers.user.update(ctx);
  }
};