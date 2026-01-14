import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <meta name="description" content="Yombal Yoon - Plateforme de covoiturage, envoi de colis et livraisons rapides au Sénégal. Partagez vos trajets et économisez sur vos déplacements." />
        <meta name="keywords" content="covoiturage, Sénégal, Dakar, livraison, colis, transport, mobilité, thiak thiak" />
        <meta name="author" content="Yombal Yoon" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Yombal Yoon - Mobilité et Livraison au Sénégal" />
        <meta property="og:description" content="La plateforme de référence pour le covoiturage et la livraison au Sénégal. Partagez vos trajets, envoyez vos colis et profitez de nos services de livraison rapide." />
        <meta property="og:site_name" content="Yombal Yoon" />
        <meta property="og:url" content="https://yombalyoon.com" />
        <meta property="og:image" content="https://yombalyoon.com/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Yombal Yoon - Mobilité et Livraison au Sénégal" />
        <meta name="twitter:description" content="La plateforme de référence pour le covoiturage et la livraison au Sénégal." />
        <meta name="twitter:image" content="https://yombalyoon.com/og-image.png" />

        <meta name="theme-color" content="#008000" />
        <link rel="icon" href="/favicon.ico" />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            #root {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `,
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
