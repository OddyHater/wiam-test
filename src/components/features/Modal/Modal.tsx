import { Typography } from 'src/components/shared';

type ModalProps = {
  name: string;
  lastName: string;
  loan: number;
  days: number;
  isOpen: boolean;
};

export const Modal = ({ name, lastName, loan, days, isOpen }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-primary-30 flex items-center justify-center z-30">
      <div className="bg-white p-8 rounded-lg flex flex-col gap-4">
        <Typography weight="bold" variant="h2">
          Поздравляем, {lastName} {name}.
        </Typography>
        <Typography>
          Вам одобрена сумма ${loan} на {days} дней.
        </Typography>
      </div>
    </div>
  );
};
