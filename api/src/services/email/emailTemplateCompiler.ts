// src/services/email/EmailTemplateCompiler.ts

import { emailConfig } from '../../config/email';
import { EmailVariables, CompiledEmail, EmailTemplateData, GlobalTemplateData } from '../../types/email';

export class EmailTemplateCompiler {
  /**
   * Replace variables in template
   */
  private static replaceVariables(template: string, variables: EmailVariables): string {
    let compiledTemplate = template;

    // Replace each variable
    Object.keys(variables).forEach((key) => {
      const placeholder = `__${key.toUpperCase()}__`;
      const value = String(variables[key]);
      compiledTemplate = compiledTemplate.replace(new RegExp(placeholder, 'g'), value);
    });

    return compiledTemplate;
  }

  /**
   * Merge global template with email content
   */
  private static mergeWithGlobalTemplate(
    globalTemplate: GlobalTemplateData,
    emailContent: string
  ): string {
    const fullTemplate = `
      ${globalTemplate.headerHtml}
      ${emailConfig.contentPlaceholder}
      ${globalTemplate.footerHtml}
    `;

    return fullTemplate.replace(emailConfig.contentPlaceholder, emailContent);
  }

  /**
   * Validate that all required variables are provided
   */
  private static validateVariables(
    requiredVariables: string[],
    providedVariables: EmailVariables
  ): { valid: boolean; missing: string[] } {
    const providedKeys = Object.keys(providedVariables).map(k => k.toUpperCase());
    const missing = requiredVariables.filter(
      variable => !providedKeys.includes(variable.replace(/__/g, ''))
    );

    return {
      valid: missing.length === 0,
      missing,
    };
  }

  /**
   * Compile complete email from template and variables
   */
  static compile(
    emailTemplate: EmailTemplateData,
    globalTemplate: GlobalTemplateData,
    variables: EmailVariables,
    subjectOverride?: string
  ): CompiledEmail {
    console.log(variables, emailTemplate.variables);
    // Validate variables
    const validation = this.validateVariables(emailTemplate.variables, variables);
    if (!validation.valid) {
      throw new Error(
        `Missing required variables: ${validation.missing.join(', ')}`
      );
    }

    // Replace variables in subject
    const subject = subjectOverride || this.replaceVariables(emailTemplate.subject, variables);

    // Replace variables in body HTML
    const compiledBody = this.replaceVariables(emailTemplate.bodyHtml, variables);

    // Merge with global template
    const html = this.mergeWithGlobalTemplate(globalTemplate, compiledBody);

    // Compile text version if available
    let text: string="";
    if (emailTemplate.bodyText) {
      text = this.replaceVariables(emailTemplate.bodyText, variables);
    }

    return {
      subject,
      html,
      text: text,
    };
  }

  /**
   * Extract variables from template string
   */
  static extractVariables(template: string): string[] {
    const matches = template.match(emailConfig.variablePattern);
    return matches ? [...new Set(matches)] : [];
  }
}

export default EmailTemplateCompiler;