import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { FormDataProvider } from 'src/context';

export const App = () => {
  return (
    <MantineProvider>
      <FormDataProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </FormDataProvider>
    </MantineProvider>
  );
};
