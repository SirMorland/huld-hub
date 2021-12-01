

module.exports = async (ctx, next) => {
  if (ctx.state.user) {
    const { id } = ctx.params;
    const { user } = ctx.state;
    if (id.toString() === user.id.toString()) {
      return ctx.forbidden('You can not update yourself');
    }
    return next();
  }
  return ctx.forbidden();
};
