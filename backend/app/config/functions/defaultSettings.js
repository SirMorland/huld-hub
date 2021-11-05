/**
 * A function that sets the default values for new users
 *
 * @param {{name: string; description: string, type: string}} default_settings Default role object
 * @returns
 */
const defaultSettings = async (default_settings) => {
  await Promise.all(
    default_settings.map(async ({ environment, type, name, key, value }) => {
      const params = {
        environment,
        type,
        name,
        key,
      };

      // Get the app settings configuration
      const prevSettings = await strapi.store(params).get();
      // Set the default role to the role type
      await strapi
        .store(params)
        .set({ value: { ...prevSettings, ...value } });
    })
  );
};

module.exports = {
  defaultSettings,
};
