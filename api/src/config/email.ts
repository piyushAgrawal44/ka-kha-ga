// src/config/email.config.ts

export const emailConfig = {
  // SMTP Configuration (use environment variables)
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  },

  // Default sender info
  from: {
    name: process.env.EMAIL_FROM_NAME || 'क-ख-ग Team',
    email: process.env.EMAIL_FROM_ADDRESS || 'noreply@kakhaga.com',
  },

  // Email settings
  settings: {
    maxRetries: 3,
    retryDelay: 5000, // 5 seconds
    timeout: 30000, // 30 seconds
  },

  // Variable replacement pattern
  variablePattern: /__([A-Z_]+)__/g,

  // Template placeholder in global template
  contentPlaceholder: '{{CONTENT}}',
};

export default emailConfig;