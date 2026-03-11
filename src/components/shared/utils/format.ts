export const formatPhone = (value: string) => {
  const sanitized = value.replace(/\D/g, '');

  if (!sanitized) {
    return '';
  }

  const digits = sanitized.startsWith('0') ? sanitized : `0${sanitized}`;
  const limited = digits.slice(0, 10);

  const parts = [
    limited.slice(0, 4),
    limited.slice(4, 7),
    limited.slice(7, 10),
  ].filter(Boolean);

  return parts.join(' ');
};

export const formatLettersOnly = (value: string) =>
  value.replace(/[^\p{L}]/gu, '');
