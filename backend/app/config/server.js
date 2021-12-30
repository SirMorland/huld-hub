module.exports = ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: env('STRAPI_URL', "http://0.0.0.0:1337"),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '093e0cff132cece8a257e18e283d0eee'),
    },
  },
});
