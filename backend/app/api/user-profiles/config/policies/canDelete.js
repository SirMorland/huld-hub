module.exports = async (ctx, next) => {
    if (ctx.state.user) {
      const { id } = ctx.params;
      const { user } = ctx.state;
      const [profile] = await strapi.services['user-profiles'].find({
        id,
        'user.id': user.id,
      });
      if (user.role.type === 'admin' && (!profile)) {
        return await next();
      } 
    }
    return ctx.unauthorized(`You're unauthorized to delete the profile`);
  };
  