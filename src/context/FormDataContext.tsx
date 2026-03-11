import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
  createContext,
} from 'react';
import type { WorkList } from 'src/api';
import type {
  PersonalData,
  AddressData,
  LoanData,
} from 'src/components/entities';

const FORM_DATA_STORAGE_KEY = 'form-data';

type PersistedFormData = {
  personalData: Partial<PersonalData>;
  addressData: Partial<AddressData>;
  loanData: LoanData;
};

interface FormDataContextValue {
  personalData: Partial<PersonalData>;
  addressData: Partial<AddressData>;
  loanData: LoanData;
  workList: WorkList[];
  isPersonalDataValid: boolean;
  isLoanDataValid: boolean;
  isAddressDataValid: boolean;
  isApplicationValid: boolean;
  setPersonalData: (data: Partial<PersonalData>) => void;
  setAddressData: (data: Partial<AddressData>) => void;
  setLoanData: (data: Partial<LoanData>) => void;
  setWorkList: (data: WorkList[]) => void;
  resetFormData: () => void;
}

const initialLoanData: LoanData = {
  loan: 500,
  day: 10,
};

const getDefaultPersistedFormData = (): PersistedFormData => ({
  personalData: {},
  addressData: {},
  loanData: initialLoanData,
});

const readPersistedFormData = (): PersistedFormData => {
  if (typeof window === 'undefined') {
    return getDefaultPersistedFormData();
  }

  const rawFormData = window.sessionStorage.getItem(FORM_DATA_STORAGE_KEY);

  if (!rawFormData) {
    return getDefaultPersistedFormData();
  }

  try {
    const parsedFormData = JSON.parse(
      rawFormData,
    ) as Partial<PersistedFormData>;

    return {
      personalData: parsedFormData.personalData ?? {},
      addressData: parsedFormData.addressData ?? {},
      loanData: {
        ...initialLoanData,
        ...parsedFormData.loanData,
      },
    };
  } catch {
    return getDefaultPersistedFormData();
  }
};

const FormDataContext = createContext<FormDataContextValue | null>(null);

const FormDataProvider = ({ children }: PropsWithChildren) => {
  const [initialFormData] = useState<PersistedFormData>(() =>
    readPersistedFormData(),
  );
  const [personalData, setPersonalDataState] = useState<Partial<PersonalData>>(
    initialFormData.personalData,
  );
  const [addressData, setAddressDataState] = useState<Partial<AddressData>>(
    initialFormData.addressData,
  );
  const [loanData, setLoanDataState] = useState<LoanData>(
    initialFormData.loanData,
  );
  const [workList, setWorkListState] = useState<WorkList[]>([]);

  const setPersonalData = useCallback((data: Partial<PersonalData>) => {
    setPersonalDataState((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const setAddressData = useCallback((data: Partial<AddressData>) => {
    setAddressDataState((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const setLoanData = useCallback((data: Partial<LoanData>) => {
    setLoanDataState((prevData) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const setWorkList = useCallback((data: WorkList[]) => {
    setWorkListState(data);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.sessionStorage.setItem(
      FORM_DATA_STORAGE_KEY,
      JSON.stringify({
        personalData,
        addressData,
        loanData,
      }),
    );
  }, [addressData, loanData, personalData]);

  const resetFormData = useCallback(() => {
    setPersonalDataState({});
    setAddressDataState({});
    setLoanDataState(initialLoanData);
    setWorkListState([]);

    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem(FORM_DATA_STORAGE_KEY);
    }
  }, []);

  const isPersonalDataValid = Object.keys(personalData).length > 0;
  const isAddressDataValid = Object.keys(addressData).length > 0;
  const isLoanDataValid = Object.keys(loanData).length > 0;

  const isApplicationValid =
    isPersonalDataValid && isAddressDataValid && isLoanDataValid;

  return (
    <FormDataContext.Provider
      value={{
        personalData,
        addressData,
        loanData,
        workList,
        setPersonalData,
        setAddressData,
        setLoanData,
        setWorkList,
        resetFormData,
        isPersonalDataValid,
        isAddressDataValid,
        isApplicationValid,
        isLoanDataValid,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export { FormDataContext, FormDataProvider };
