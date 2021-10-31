/**
 * A function that sets the default values for new users
 *
 * @param {{name: string; description: string, type: string}} default_settings Default role object
 * @returns
 */
const defaultSettings = async (default_settings) => {
  await Promise.all(
    default_settings.map(async (setting) => {
      const pluginStore = await strapi.store({
        ...(setting.environment && { environment: setting.environment }),
        ...(setting.type && { type: setting.type }),
        ...(setting.name && { name: setting.name }),
      });

      // Get the app settings configuration
      const prev_setting = await pluginStore.get({
        key: setting.key,
      });

      // Set the default role to the role type
      await pluginStore.set({
        key: setting.key,
        value: { ...prev_setting, ...setting.value },
      });
    })
  );
};

module.exports = {
  defaultSettings,
};
