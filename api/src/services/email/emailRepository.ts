// src/services/email/EmailRepository.ts

import { PrismaClient, EmailTemplateType, EmailStatus } from '@prisma/client';
import { EmailTemplateData, GlobalTemplateData, EmailLogData } from '../../types/email.js';
import moment from 'moment';

export class EmailRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  /**
   * Get email template by type
   */
  async getTemplateByType(templateType: EmailTemplateType): Promise<EmailTemplateData | null> {
    const template = await this.prisma.emailTemplate.findUnique({
      where: {
        templateType,
        isActive: true,
      },
    });

    if (!template) return null;

    return {
      ...template,
      variables: template.variables as string[],
    };
  }

  /**
   * Get active global template
   */
  async getGlobalTemplate(): Promise<GlobalTemplateData | null> {
    return await this.prisma.globalEmailTemplate.findFirst({
      where: {
        isActive: true,
      },
    });
  }

  /**
   * Create email log entry
   */
  async createEmailLog(data: EmailLogData): Promise<void> {
    await this.prisma.emailLog.create({
      data,
    });
  }

  /**
   * Update email log status
   */
  async updateEmailLogStatus(
    id: number,
    status: EmailStatus,
    errorMessage?: string,
    sentAt?: Date
  ): Promise<void> {
    await this.prisma.emailLog.update({
      where: { id },
      data: {
        status,
        errorMessage: errorMessage || "Unknown Error",
        sentAt: sentAt || moment().toDate(),
      },
    });
  }

  /**
   * Get email logs by recipient
   */
  async getEmailLogsByRecipient(email: string, limit: number = 10) {
    return await this.prisma.emailLog.findMany({
      where: {
        recipientEmail: email,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
    });
  }

  /**
   * Get failed email logs for retry
   */
  async getFailedEmailLogs(limit: number = 50) {
    return await this.prisma.emailLog.findMany({
      where: {
        status: EmailStatus.FAILED,
      },
      orderBy: {
        createdAt: 'asc',
      },
      take: limit,
    });
  }

  /**
   * Create or update email template
   */
  async upsertEmailTemplate(data: {
    templateType: EmailTemplateType;
    templateName: string;
    subject: string;
    bodyHtml: string;
    bodyText?: string;
    variables: string[];
  }) {
    return await this.prisma.emailTemplate.upsert({
      where: {
        templateType: data.templateType,
      },
      create: data,
      update: {
        templateName: data.templateName,
        subject: data.subject,
        bodyHtml: data.bodyHtml,
        bodyText: data.bodyText || "-",
        variables: data.variables,
      },
    });
  }

  /**
   * Create or update global template
   */
  async upsertGlobalTemplate(data: {
    name?: string;
    headerHtml: string;
    footerHtml: string;
  }) {
    const existing = await this.prisma.globalEmailTemplate.findFirst();

    if (existing) {
      return await this.prisma.globalEmailTemplate.update({
        where: { id: existing.id },
        data,
      });
    }

    return await this.prisma.globalEmailTemplate.create({
      data: {
        name: data.name || 'default',
        headerHtml: data.headerHtml,
        footerHtml: data.footerHtml,
      },
    });
  }
}

export default EmailRepository;