import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0';
import Layout from '../components/layout'
import '../styles/globals.css'

function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default App