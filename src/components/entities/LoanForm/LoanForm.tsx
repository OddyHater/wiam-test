import { useEffect, useState } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { Button, FormStepLayout, Typography } from 'src/components/shared';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from 'src/context';
import { LoanDataSchema, type LoanData } from './loanData.schema';
import { sendApplication } from 'src/api';
import { FormSlider, Modal } from 'src/components/features';

export const LoanForm = () => {
  const {
    loanData,
    personalData,
    setLoanData,
    isPersonalDataValid,
    isAddressDataValid,
    isApplicationValid,
    resetFormData,
  } = useFormData();
  const { control, handleSubmit } = useForm<LoanData>({
    resolver: zodResolver(LoanDataSchema.required()),
    defaultValues: loanData,
  });
  const { loan = 500, day = 10 } = useWatch({ control });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPersonalDataValid || !isAddressDataValid) {
      navigate('/');
    }
  }, [isAddressDataValid, isPersonalDataValid, navigate]);

  useEffect(() => {
    setLoanData({
      loan,
      day,
    });
  }, [day, loan, setLoanData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit: SubmitHandler<LoanData> = () => {
    if (!isApplicationValid) {
      navigate('/');
    }

    sendApplication({
      firstName: personalData.name!,
      lastName: personalData.lastName!,
    })
      .then(() => {
        setIsModalOpen(true);
      })
      .then(() => {
        setTimeout(() => {
          resetFormData();
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error sending application:', error);
      });
  };

  return (
    <>
      <FormStepLayout
        onSubmit={handleSubmit(onSubmit)}
        title="Условия займа"
        description="Выберете удобный вариант"
        actions={
          <div className="flex justify-between">
            <Button
              onClick={() => {
                navigate('/address');
              }}
              className="px-4 py-2"
              variant="secondary"
              type="button"
            >
              Назад
            </Button>
            <Button className="px-4 py-2" type="submit">
              Подать заявку
            </Button>
          </div>
        }
      >
        <div>
          <FormSlider
            control={control}
            name="loan"
            labelText="Сумма займа"
            min={200}
            max={1000}
            step={100}
            label={(label) => `$${label}`}
          />
          <Typography variant="caption">${loan}</Typography>
        </div>
        <div>
          <FormSlider
            control={control}
            name="day"
            labelText="Срок займа"
            min={10}
            max={30}
          />
          <Typography variant="caption">{day}</Typography>
        </div>
      </FormStepLayout>
      <Modal
        name={personalData.name!}
        lastName={personalData.lastName!}
        loan={loanData.loan!}
        days={loanData.day!}
        isOpen={isModalOpen}
      />
    </>
  );
};
