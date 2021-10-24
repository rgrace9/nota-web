import '../styles/globals.scss'
import { appWithTranslation } from 'next-i18next'
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";


function MyApp({ Component, pageProps }) {
  const router = useRouter();

  function storePathValues() {
    // const storage = globalThis?.sessionStorage;
    // if (!storage) return;
    // // Set the previous path as the value of the current path (the page the user is leaving).
    // const prevPath = storage.getItem("currentPath");
    // storage.setItem("prevPath", prevPath);
    // if (!prevPath) {
    //   storage.setItem("prevPath", globalThis.location.href);
    // }
    // // Set the current path value by looking at the browser's location object.
    // storage.setItem("currentPath", globalThis.location.href);
    
    // storage.setItem("currentIsPrev", prevPath === globalThis.location.href)
  }

  useEffect(() => storePathValues, [router.asPath]);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default appWithTranslation(MyApp)
