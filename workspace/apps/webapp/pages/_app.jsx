import './styles.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@basketo/web-ui';
import { Provider } from 'react-redux';
import { store, persistor } from '../app/store';
import Script from 'next/script';
import Layout from '../Components/Layout';
import { ReactQueryDevtools } from 'react-query/devtools';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      //   staleTime: 60000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      //   refetchInterval: Infinity,
      //   cacheTime: Infinity,
      retry: false,
      retryOnMount: false,
    },
    // mutations: {
    //   retry: false,
    // },
  },
});

const localStoragePersistor = createWebStoragePersistor({
  storage: typeof window !== 'undefined' && window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Provider store={store} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Script
            strategy="lazyOnload"
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
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
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Cinzel&family=Poppins:ital,wght@0,700;1,700&display=swap"
            rel="stylesheet"
          ></link>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </ThemeProvider>
  );
}

App.getInitialProps = async (appContext) => {
  // ...
  persistor.persist();
  return { persistor };
};

export default App;
