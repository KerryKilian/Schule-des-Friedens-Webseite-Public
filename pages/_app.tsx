import type { AppProps } from 'next/app'
import "../styles/css/styles.css";
import { LoginContext } from '@/src/frontend/LoginContext';
import { useEffect, useState } from 'react';
import { getLoginInfoFromJWT } from '@/src/frontend/JWTManager';
import { ErrorBoundary } from 'react-error-boundary';
import Header from '@/src/frontend/components/Header';
import ErrorFallback from '@/src/frontend/components/ErrorFallback';
import Footer from '@/src/frontend/components/Footer';


export default function App({ Component, pageProps }: AppProps) {
// get localStorage must be in useEffect
useEffect(() => {
  const jwtToken = localStorage.getItem("jwt");
  if (jwtToken) {
    setLoginInfo(getLoginInfoFromJWT(jwtToken));
  }
}, []);

const [loginInfo, setLoginInfo] = useState<{ip: string} | null>(null);
  return <>
    <LoginContext.Provider value={{ loginInfo, setLoginInfo }}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
      </ErrorBoundary>
    </LoginContext.Provider>
  </>
}
