import nodemailer from 'nodemailer';

export interface EmailPayload {
  nombre: string;
  email: string;
  phone?: string;
  asunto: string;
  mensaje: string;
  codigopostal?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  private getTransporter() {
    if (!this.transporter) {
      this.transporter = nodemailer.createTransport({
        host: import.meta.env.SMTP_HOST,
        port: Number(import.meta.env.SMTP_PORT),
        secure: false,
        auth: {
          user: import.meta.env.SMTP_USER,
          pass: import.meta.env.SMTP_PASS,
        },
      });
    }
    return this.transporter;
  }

  async sendContactEmail(data: EmailPayload) {
    const { nombre, email, phone, asunto, mensaje, codigopostal } = data;
    const transporter = this.getTransporter();

    const html = `
      <h3>Nuevo mensaje de contacto</h3>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
      <p><strong>Código Postal:</strong> ${codigopostal || 'No proporcionado'}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `;

    try {
      await transporter.sendMail({
        from: `"${import.meta.env.SMTP_FROM_NAME}" <${import.meta.env.SMTP_USER}>`,
        to: import.meta.env.SMTP_USER,
        subject: `[Contacto Web] ${asunto}`,
        html,
      });
      return { success: true };
    } catch (error) {
      console.error('EmailService Error:', error);
      throw new Error('No se pudo enviar el correo en este momento.');
    }
  }
}

export const emailService = new EmailService();
