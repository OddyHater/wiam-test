import type { ComponentPropsWithoutRef, ElementType } from 'react';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body' | 'body-sm' | 'caption';

export type TypographyWeight =
  | 'thin' // 300
  | 'regular' // 400
  | 'bold'; // 700

export type TypographyColor = 'primary' | 'secondary' | 'description' | 'danger';

export type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
} & ComponentPropsWithoutRef<T>;
