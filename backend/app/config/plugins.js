module.exports = ({ env }) => ({
  // email: {
  //   provider: 'nodemailer',
  //   providerOptions: {
  //     host: env('SMTP_HOST'),
  //     port: env('SMTP_PORT'),
  //     auth: {
  //       user: env('SMTP_USERNAME'),
  //       pass: env('SMTP_PASSWORD'),
  //     },
  //     // ... any custom nodemailer options
  //   },
  //   settings: {
  //     defaultFrom: env('EMAIL_FROM'),
  //     defaultReplyTo: env('EMAIL_REPLY_TO'),
  //   },
  // },
  email: {
    provider: 'amazon-ses',
    providerOptions: {
      key: 'AKIAU4VVH26Y5BS5B2HX',
      secret: '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',
      amazon: `https://email.us-east-2.amazonaws.com`
    },
    settings: {
      defaultFrom: 'clavuyep@gmail.com',
      defaultReplyTo: 'clavuyep@gmail.com'
    }
  },
});