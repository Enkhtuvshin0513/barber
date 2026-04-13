import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

const loadTemplate = (subject: string, body: string) => {
  const templatePath = path.join(__dirname, 'emailTemplate.html');
  const raw = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(raw);

  return template({ subject, body, year: new Date().getFullYear() });
};

export class EmailService {
  static sendTestEmail = async (to: string, subject: string, body: string) => {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: `"Barber App" <${testAccount.user}>`,
      to,
      subject,
      html: loadTemplate(subject, body),
    });

    return {
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info),
    };
  };
}
