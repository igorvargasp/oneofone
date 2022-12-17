import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MetaMaskProvider } from "metamask-react";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <MetaMaskProvider>
        <Component {...pageProps} />
      </MetaMaskProvider>
    </ThirdwebProvider>
  );
}
