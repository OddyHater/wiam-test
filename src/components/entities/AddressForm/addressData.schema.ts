import { z } from 'zod';

export const AddressDataSchema = z.object({
  work: z.string().min(1, 'Выберите место работы'),
  address: z.string().trim().min(1, 'Введите адрес проживания'),
});

export type AddressData = z.infer<typeof AddressDataSchema>;
