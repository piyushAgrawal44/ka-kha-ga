// src/services/email/EmailService.ts

import { PrismaClient, EmailStatus } from '@prisma/client';
import { EmailRepository } from './emailRepository.js';
import EmailTemplateCompiler from './emailTemplateCompiler.js';
import { SendEmailOptions } from '../../types/email.js';
import EmailSender from './emailSender.js';

export class EmailService {
  private repository: EmailRepository;
  private sender: EmailSender;

  constructor(prisma: PrismaClient) {
    this.repository = new EmailRepository(prisma);
    this.sender = new EmailSender();
  }

  /**
   * Send email using template
   */
  async sendEmail(options: SendEmailOptions): Promise<void> {
    const { to, recipientName="", templateType, variables, subject: subjectOverride } = options;

    // 1. Get email template
    const emailTemplate = await this.repository.getTemplateByType(templateType);
    if (!emailTemplate) {
      throw new Error(`Email template not found for type: ${templateType}`);
    }

    // 2. Get global template
    const globalTemplate = await this.repository.getGlobalTemplate();
    if (!globalTemplate) {
      throw new Error('Global email template not found');
    }

    // 3. Create email log entry (PENDING)
    await this.repository.createEmailLog({
      recipientEmail: to,
      recipientName,
      subject: subjectOverride || emailTemplate.subject,
      templateType,
      status: EmailStatus.PENDING,
    });

    try {
      // 4. Compile email
      const compiledEmail = EmailTemplateCompiler.compile(
        emailTemplate,
        globalTemplate,
        variables,
        subjectOverride
      );

      // 5. Send email
      const result = await this.sender.sendWithRetry(to, recipientName, compiledEmail);

      // 6. Update log status
      if (result.success) {
        await this.repository.createEmailLog({
          recipientEmail: to,
          recipientName,
          subject: compiledEmail.subject,
          templateType,
          status: EmailStatus.SENT,
          sentAt: new Date(),
        });
      } else {
        await this.repository.createEmailLog({
          recipientEmail: to,
          recipientName,
          subject: compiledEmail.subject,
          templateType,
          status: EmailStatus.FAILED,
          errorMessage: result.error || "",
        });
        throw new Error(result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      await this.repository.createEmailLog({
        recipientEmail: to,
        recipientName,
        subject: subjectOverride || emailTemplate.subject,
        templateType,
        status: EmailStatus.FAILED,
        errorMessage,
      });

      throw error;
    }
  }

  /**
   * Verify email service is working
   */
  async verifyService(): Promise<boolean> {
    return await this.sender.verifyConnection();
  }

  /**
   * Get email logs for a recipient
   */
  async getEmailLogs(recipientEmail: string, limit?: number) {
    return await this.repository.getEmailLogsByRecipient(recipientEmail, limit);
  }

  /**
   * Retry failed emails
   */
  async retryFailedEmails(limit: number = 50): Promise<number> {
    const failedLogs = await this.repository.getFailedEmailLogs(limit);
    let retriedCount = 0;

    for (const log of failedLogs) {
      try {
        await this.sendEmail({
          to: log.recipientEmail,
          recipientName: log.recipientName || "User",
          templateType: log.templateType,
          variables: {}, // Note: Original variables are not stored, consider storing them if retry is important
          subject: log.subject,
        });
        retriedCount++;
      } catch (error) {
        console.error(`Failed to retry email to ${log.recipientEmail}:`, error);
      }
    }

    return retriedCount;
  }
}

export default EmailService;