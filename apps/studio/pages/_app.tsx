import { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import ThemeCustomization from '../themes';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to studio!</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
      <ThemeCustomization>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeCustomization>
    </>
  );
}

export default CustomApp;
