module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp.example.com'),
      port: env('SMTP_PORT', 587),
      auth: {
        user: env('SMTP_USERNAME', 'test@example.com'),
        pass: env('SMTP_PASSWORD', '1234'),
      },
      // ... any custom nodemailer options
    },
    settings: {
      defaultFrom: env('EMAIL_FROM', 'test@example.com'),
      defaultReplyTo: env('EMAIL_REPLY_TO', 'test@example.com'),
    },
  },
});