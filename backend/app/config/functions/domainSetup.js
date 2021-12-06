/**
 * A function that sets the allowed domains for registeration
 *
 * @param {Array<{ domain: string; type: "internal" | "external"; }>} domains
 */
const domainSetup = async (domains) => {
  await Promise.all(
    domains.map(async (domain) => {
      const domainExists = await strapi.query("email-domains").findOne(domain);
      if (!domainExists) return strapi.query("email-domains").create(domain);
      return false;
    })
  );
};

module.exports = { domainSetup };
