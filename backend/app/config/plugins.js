module.exports = ({ env }) => ({
  email: {
    provider: 'nodemailer',
    providerOptions: {
      host: env('SMTP_HOST', 'smtp.example.com'),
      port: env('SMTP_PORT', 587),
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
  upload: {
    provider: "aws-s3",
    providerOptions: {
      accessKeyId: env('AWS_KEY'),
      secretAccessKey: env('AWS_SECRET'),
      region: env('AWS_REGION', 'eu-west-1'),
      s3ForcePathStyle: env('AWS_S3_FORCE_PATH_STYLE'),
      sslEnabled: env('AWS_SSL_ENABLED'),
      endpoint: env('NODE_ENV') === 'development' ? {
        host: `localhost:${env('AWS_S3_PORT')}`,
        hostname: env('AWS_S3_HOSTNAME'),
        port: env('AWS_S3_PORT'),
      } : undefined,
      params: {
        Bucket: env('AWS_S3_BUCKET'),
      }
    },
  }
});