import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { InvoiceFormContextProvider } from '../context/InvoiceForm';
import { HomeContextProvider } from '../context/Home';
import { SessionProvider } from 'next-auth/react';
import '../styles/index.scss'

export type NextPageWithLayout<Props> = NextPage<Props> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout<AppProps>
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <SessionProvider session={session}>
      <HomeContextProvider>
        <InvoiceFormContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </InvoiceFormContextProvider>
      </HomeContextProvider>
    </SessionProvider>
  )
}

export default MyApp
