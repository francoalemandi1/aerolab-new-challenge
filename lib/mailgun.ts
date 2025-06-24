import Mailgun from "mailgun.js";
import formData from "form-data";

if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
  throw new Error("Missing Mailgun environment variables");
}

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions) {
  try {
    const result = await mg.messages.create(process.env.MAILGUN_DOMAIN!, {
      from: `Aerolab Challenge <noreply@${process.env.MAILGUN_DOMAIN}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    return { success: true, messageId: result.id };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export function generatePasswordResetEmail(resetUrl: string, email: string) {
  return {
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Reset Your Password</h1>
        <p>Hi there,</p>
        <p>We received a request to reset the password for your account associated with ${email}.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Reset Password</a>
        <p>If you didn't request this password reset, you can safely ignore this email.</p>
        <p>This link will expire in 1 hour for security reasons.</p>
        <p>Best regards,<br>The Aerolab Team</p>
      </div>
    `,
    text: `
      Reset Your Password
      
      Hi there,
      
      We received a request to reset the password for your account associated with ${email}.
      
      Click the link below to reset your password:
      ${resetUrl}
      
      If you didn't request this password reset, you can safely ignore this email.
      
      This link will expire in 1 hour for security reasons.
      
      Best regards,
      The Aerolab Team
    `,
  };
} 