import { ConfigContext, type ConfigContextType } from 'components/configs-context';
import { AppProps } from 'next/app';
import Head from 'next/head';
import MainLayout from '../components/MainLayout';
import ThemeCustomization from '../themes';
import App from "next/app"
import { readdirSync, readFileSync } from 'fs';
import { getConfigPath } from 'server/store';
import { resolve } from 'path';

function CustomApp({ Component, pageProps, props }: AppProps & { props: {menuItems: ConfigContextType} }) {
  return (
    <>
      <Head>
        <title>Magic Studio</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>
      <ThemeCustomization>
        <ConfigContext.Provider value={props.menuItems}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ConfigContext.Provider>
      </ThemeCustomization>
    </>
  );
}

CustomApp.getInitialProps = async (appContext) => {
  const defaultAppThingie = App.getInitialProps(appContext);
  const configs = readdirSync(getConfigPath());

  const menuItems = configs.map((config) => {
    const { title, uuid } = JSON.parse(readFileSync(resolve(getConfigPath(), config), 'utf-8'));
    return { title, uuid, url: `/ui/${uuid}` };
  });

  return {
      props: {
        ...defaultAppThingie,
        menuItems
      }
  };
}

export default CustomApp;
