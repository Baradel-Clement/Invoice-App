import Layout from '../components/Layout';
import { StateContext } from '../context/StateContext';
import { SessionProvider } from 'next-auth/react';
import '../styles/index.scss'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <StateContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </SessionProvider>
  )
}

export default MyApp
