import './styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@basketo/web-ui';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Script from 'next/script';
import Layout from '../Components/Layout';

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
          <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
          <Script strategy="lazyOnload" id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              });
            `}
          </Script>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
