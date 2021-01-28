import { AppProps } from 'next/app';
import { Global, css } from '@emotion/react';
import { PreviewContextProvider } from 'contexts/previewContext';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Global
      styles={css`
        html,
        body,
        #__next {
          height: 100vh;
          width: 100vw;
          margin: 0;
        }
      `}
    />
    <PreviewContextProvider>
      <Component {...pageProps} />
    </PreviewContextProvider>
  </>
);

export default App;
