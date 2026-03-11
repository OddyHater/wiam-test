import { useContext } from 'react';
import { FormDataContext } from './FormDataContext';

export const useFormData = () => {
  const context = useContext(FormDataContext);

  if (!context) {
    throw new Error('useFormData must be used within FormDataProvider');
  }

  return context;
};
