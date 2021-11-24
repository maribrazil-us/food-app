module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'http://localhost:1337'),

  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '974bd4b49ae9a328ad0459f0c1a1dcac'),
    },
  },
});
