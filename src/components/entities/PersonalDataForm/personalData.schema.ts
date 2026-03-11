import { z } from 'zod';

export const PersonalDataSchema = z.object({
  phone: z
    .string('Введите телефон в формате 0XXX XXX XXX')
    .regex(/^0\d{3} \d{3} \d{3}$/, 'Введите телефон в формате 0XXX XXX XXX'),
  name: z
    .string('Обязательное поле')
    .min(2, 'Обязательное поле')
    .max(60)
    .regex(/^\p{L}+$/u, 'Допустимы только буквы'),
  lastName: z
    .string('Обязательное поле')
    .min(2, 'Обязательное поле')
    .max(60)
    .regex(/^\p{L}+$/u, 'Допустимы только буквы'),
  gender: z.enum(['male', 'female'], 'Обязательное поле'),
});

export type PersonalData = z.infer<typeof PersonalDataSchema>;
