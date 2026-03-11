import { useForm, useWatch, type SubmitHandler } from 'react-hook-form';
import { Button, FormStepLayout } from 'src/components/shared';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormData } from 'src/context';
import { AddressDataSchema, type AddressData } from './addressData.schema';
import { getWorkList } from 'src/api';
import { FormInput, FormSelect } from 'src/components/features';

export const AddressForm = () => {
  const navigate = useNavigate();

  const {
    addressData,
    setAddressData,
    workList,
    setWorkList,
    isPersonalDataValid,
  } = useFormData();

  const { control, handleSubmit } = useForm<AddressData>({
    resolver: zodResolver(AddressDataSchema.required()),
    defaultValues: {
      work: '',
      address: '',
      ...addressData,
    },
  });
  const formValues = useWatch({ control });

  useEffect(() => {
    if (!isPersonalDataValid) {
      navigate('/');
    }
  }, [isPersonalDataValid, navigate]);

  useEffect(() => {
    setAddressData(formValues);
  }, [formValues, setAddressData]);

  const onSubmit: SubmitHandler<AddressData> = () => {
    navigate('/loan');
  };

  useEffect(() => {
    if (workList.length > 0) {
      return;
    }

    getWorkList().then((res) => {
      setWorkList(res);
    });
  }, [setWorkList, workList.length]);

  const mappedWorks = workList.map((work) => ({
    label: work.name,
    value: work.slug,
  }));

  return (
    <FormStepLayout
      onSubmit={handleSubmit(onSubmit)}
      title="Личные данные"
      description="Введите данные, чтобы продолжить"
      actions={
        <div className="flex justify-between">
          <Button
            className="px-4 py-2"
            variant="secondary"
            type="button"
            onClick={() => navigate('/')}
          >
            Назад
          </Button>
          <Button className="px-4 py-2" variant="primary" type="submit">
            Далее
          </Button>
        </div>
      }
    >
      <FormSelect
        control={control}
        name="work"
        placeholder="Место работы"
        options={mappedWorks}
      />

      <FormInput
        control={control}
        name="address"
        placeholder="Адрес проживания"
        type="text"
      />
    </FormStepLayout>
  );
};
