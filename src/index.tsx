import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { celo } from 'viem/chains';
import { createConfig, http, WagmiProvider } from 'wagmi';
// fonts
// import '@fontsource/plus-jakarta-sans/latin.css';
import './lib/styles/globals.css';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const config = createConfig({
  chains: [celo],
  transports: {
    [celo.id]: http(),
  },
});

root.render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </React.StrictMode>
);
