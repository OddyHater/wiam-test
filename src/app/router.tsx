import { Routes, Route } from 'react-router-dom';
import { AddressDataPage, LoanDataPage, PersonalDataPage } from 'src/pages';
import { ROUTES } from 'src/components/shared';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<PersonalDataPage />} />
      <Route path={ROUTES.ADDRESS} element={<AddressDataPage />} />
      <Route path={ROUTES.LOAN} element={<LoanDataPage />} />
    </Routes>
  );
};
