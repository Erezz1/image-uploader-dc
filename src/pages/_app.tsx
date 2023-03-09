import type { AppProps } from 'next/app';
import Head from 'next/head';
import './index.scss';
import 'toastify-js/src/toastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Image Uploader</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}
