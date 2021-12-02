'use strict';

module.exports = {
  update: async (ctx) => {
    const { id } = ctx.params;
    if (!id) ctx.badRequest();

    const password = await strapi.plugins['users-permissions'].services.user.hashPassword({
      password: ctx.request.body.password
    });
    await strapi
      .query('user', 'users-permissions')
      .update({ id }, { resetPasswordToken: null, password });

    ctx.send({
      jwt: strapi.plugins['users-permissions'].services.jwt.issue({ id }),
    });
  }
};