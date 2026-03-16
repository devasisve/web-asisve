import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { emailService } from '../services/email.service';

export const server = {
  sendContactEmail: defineAction({
    input: z.object({
      nombre: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      Asunto: z.string(),
      Mensaje: z.string().min(10),
      codigopostal: z.string().optional(),
    }),
    handler: async (input) => {
      try {
        await emailService.sendContactEmail({
          nombre: input.nombre,
          email: input.email,
          phone: input.phone,
          asunto: input.Asunto,
          mensaje: input.Mensaje,
          codigopostal: input.codigopostal,
        });
        return { success: true, message: "Mensaje enviado correctamente" };
      } catch (error) {
        return { success: false, message: (error as Error).message };
      }
    },
  }),
};
