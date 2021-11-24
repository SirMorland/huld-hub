module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    if (user.role.type !== 'admin') {
      const [profile] = await strapi.services['user-profiles'].find({
        id,
        'user.id': ctx.state.user.id,
      });
      if (profile) return await next();
    } else return await next();
  }
  return ctx.unauthorized(`You're unauthorized to update the profile`);
};