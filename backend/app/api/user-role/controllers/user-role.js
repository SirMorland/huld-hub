'use strict';

module.exports = {
  update: (ctx) => {
    const { role } = ctx.params;
    return strapi.plugins["users-permissions"].controllers.user.update({...ctx, params: { role }});
  }
};