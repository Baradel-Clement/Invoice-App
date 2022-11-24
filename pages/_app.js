import Layout from '../components/Layout';
import { InvoiceFormStateContext } from '../context/InvoiceForm';
import { HomeStateContext } from '../context/Home';
import { SessionProvider } from 'next-auth/react';
import '../styles/index.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <HomeStateContext>
        <InvoiceFormStateContext>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </InvoiceFormStateContext>
      </HomeStateContext>
    </SessionProvider>
  )
}

export default MyApp
