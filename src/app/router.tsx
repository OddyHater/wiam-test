import { Routes, Route } from 'react-router-dom';
import { PersonalDataPage } from 'src/pages/PersonalDataPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalDataPage />} />
    </Routes>
  );
};
