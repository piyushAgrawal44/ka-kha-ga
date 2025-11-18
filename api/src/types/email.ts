// src/types/email.types.ts

import { EmailTemplateType, EmailStatus } from "@prisma/client";


export interface EmailVariables {
  [key: string]: string | number | boolean;
}

export interface SendEmailOptions {
  to: string;
  recipientName?: string;
  templateType: EmailTemplateType;
  variables: EmailVariables;
  subject?: string; // Override template subject if needed
}

export interface EmailTemplateData {
  id: number;
  templateName: string;
  templateType: EmailTemplateType;
  subject: string;
  bodyHtml: string;
  bodyText: string | null;
  variables: string[];
  isActive: boolean;
}

export interface GlobalTemplateData {
  id: number;
  name: string;
  headerHtml: string;
  footerHtml: string;
  isActive: boolean;
}

export interface CompiledEmail {
  subject: string;
  html: string;
  text?: string;
}

export interface EmailLogData {
  recipientEmail: string;
  recipientName?: string;
  subject: string;
  templateType: EmailTemplateType;
  status: EmailStatus;
  errorMessage?: string;
  sentAt?: Date;
}