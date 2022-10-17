import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import NotistackProvider from './components/Notistack';
import { OverrideScroll } from './components/OverrideScroll';
import ProgressBar, { ProgressBarStyle } from './components/ProgressBar';
import Router from './routes';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NotistackProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ProgressBarStyle />
            <ProgressBar />
            <OverrideScroll />
            <Router />
            <ReactQueryDevtools initialIsOpen={false} />
          </LocalizationProvider>
        </NotistackProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
