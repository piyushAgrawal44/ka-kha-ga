// src/services/email/EmailSender.ts

import nodemailer, { Transporter } from 'nodemailer';
import { emailConfig } from '../../config/email.js';
import { CompiledEmail } from '../../types/email.js';

export class EmailSender {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: emailConfig.smtp.host,
      port: emailConfig.smtp.port,
      secure: emailConfig.smtp.secure,
      auth: emailConfig.smtp.auth,
    });
  }

  /**
   * Send email
   */
  async send(
    to: string,
    recipientName: string | undefined,
    compiledEmail: CompiledEmail
  ): Promise<void> {
    const mailOptions = {
      from: {
        name: emailConfig.from.name,
        address: emailConfig.from.email,
      },
      to: recipientName ? `"${recipientName}" <${to}>` : to,
      subject: compiledEmail.subject,
      html: compiledEmail.html,
      text: compiledEmail.text,
    };

    await this.transporter.sendMail(mailOptions);
  }

  /**
   * Verify connection to SMTP server
   */
  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email connection verification failed:', error);
      return false;
    }
  }

  /**
   * Send email with retry logic
   */
  async sendWithRetry(
    to: string,
    recipientName: string | undefined,
    compiledEmail: CompiledEmail,
    maxRetries: number = emailConfig.settings.maxRetries
  ): Promise<{ success: boolean; error?: string }> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        await this.send(to, recipientName, compiledEmail);
        return { success: true };
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries) {
          // Wait before retrying
          await new Promise(resolve =>
            setTimeout(resolve, emailConfig.settings.retryDelay * (attempt + 1))
          );
        }
      }
    }

    return {
      success: false,
      error: lastError?.message || 'Unknown error',
    };
  }
}

export default EmailSender;