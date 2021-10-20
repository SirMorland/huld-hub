module.exports = ({ env }) => ({
  // NODEMAILER
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST'),
      port: env('SMTP_PORT'),
      auth: {
        user: env('SMTP_USERNAME'),
        pass: env('SMTP_PASSWORD'),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: env('EMAIL_FROM'),
      defaultReplyTo: env('EMAIL_REPLY_TO'),
    },
  },
  //AMAZON SIMPLE EMAIL SERVICE
  // email: {
  //   provider: 'amazon-ses',
  //   providerOptions: {
  //     key: env('AWS_ACCESS_KEY_ID'),
  //     secret: env('AWS_SECRET_ACCESS_KEY'),
  //     amazon: `https://email.${env('AWS_REGION')}.amazonaws.com`
  //   },
  //   settings: {
  //     defaultFrom: env('EMAIL_FROM'),
  //     defaultReplyTo: env('EMAIL_REPLY_TO')
  //   }
  // },
});