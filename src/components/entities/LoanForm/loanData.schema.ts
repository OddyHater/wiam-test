import { z } from 'zod';

export const LoanDataSchema = z.object({
  loan: z.number().min(200).max(1000),
  day: z.number().min(10).max(30),
});

export type LoanData = z.infer<typeof LoanDataSchema>;
