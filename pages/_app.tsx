// pages/_app.tsx
import { AppProps } from 'next/app';
import Head from 'next/head'; // Import Head from next/head
import '../styles/globals.css';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Aclonica&family=Oswald:wght@200..700&display=swap"
          rel="stylesheet"
        />
        <meta name="description" content="The games trading zone" />
        <meta name="robots" content="for games,to gamers,by gamers" />
        <meta property="og:type" content="for games,to gamers,by gamers" />
        <meta property="og:site_name" content="Trading" />
        <meta property="og:title" content="Gamin platform" />
        <meta property="og:description" content="for games,to gamers,by gamers" />
        <meta property="og:url" content="https://www.buy.trollsufficient.com/" />
        <meta property="og:image" content="https://www.buy.trollsufficient.com/" />
        <title>Buy Castles and more</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
