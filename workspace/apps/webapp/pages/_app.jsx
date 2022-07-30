import './styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@basketo/web-ui';
import { Provider } from 'react-redux';
import { store } from '../app/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: Infinity,
      cacheTime: Infinity,
      retry: false,
      retryOnMount: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
