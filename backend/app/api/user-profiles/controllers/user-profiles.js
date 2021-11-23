'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Update a record only if the current user is linked to the profile or if the user is an admin
   *
   * @return {Object}
   */

  async update(ctx) {
    const { id } = ctx.params;
    let entity;
    if (ctx.state && ctx.state.user && ctx.state.user.role && ctx.state.user.role.type !== 'admin') {
      const [profile] = await strapi.services['user-profiles'].find({
        id,
        'user.id': ctx.state.user.id,
      });
      if (!profile) {
        return ctx.unauthorized(`You can't update this entry`);
      }
    }
  
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services['user-profiles'].update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services['user-profiles'].update({ id }, ctx.request.body);
    }
  
    return sanitizeEntity(entity, { model: strapi.models['user-profiles'] });
  },
};
