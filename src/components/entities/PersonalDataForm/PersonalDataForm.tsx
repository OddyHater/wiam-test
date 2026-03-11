import { useEffect } from 'react';
import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import {
  Button,
  FormStepLayout,
  formatLettersOnly,
  formatPhone,
} from 'src/components/shared';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from 'src/context';
import { type PersonalData, PersonalDataSchema } from './personalData.schema';
import { FormInput, FormSelect } from 'src/components/features';

export const PersonalDataForm = () => {
  const navigate = useNavigate();

  const { personalData, setPersonalData } = useFormData();
  const { control, handleSubmit } = useForm<PersonalData>({
    defaultValues: personalData,
    resolver: zodResolver(PersonalDataSchema.required()),
  });
  const formValues = useWatch({ control });

  useEffect(() => {
    setPersonalData(formValues);
  }, [formValues, setPersonalData]);

  const onSubmit: SubmitHandler<PersonalData> = (data) => {
    setPersonalData(data);
    navigate('/address');
  };

  return (
    <FormStepLayout
      onSubmit={handleSubmit(onSubmit)}
      title="Личные данные"
      description="Введите данные, чтобы продолжить"
      actions={
        <Button className="self-end px-4 py-2" type="submit">
          Далее
        </Button>
      }
    >
      <FormInput
        control={control}
        name="phone"
        placeholder="Телефон"
        type="tel"
        format={formatPhone}
        inputMode="numeric"
        autoComplete="tel"
      />

      <FormInput
        control={control}
        name="name"
        placeholder="Имя"
        type="text"
        format={formatLettersOnly}
      />

      <FormInput
        control={control}
        name="lastName"
        placeholder="Фамилия"
        type="text"
        format={formatLettersOnly}
      />

      <FormSelect
        control={control}
        name="gender"
        placeholder="Пол"
        options={[
          {
            label: 'Мужской',
            value: 'male',
          },
          {
            label: 'Женский',
            value: 'female',
          },
        ]}
      />
    </FormStepLayout>
  );
};
