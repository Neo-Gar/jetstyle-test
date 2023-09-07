import '@/styles/components/base/globals.css'
import '@/styles/components/base/reset.css'
import type { AppProps } from 'next/app'
import Layout from "@/components/base/layout";
import ModalsRoot from "@/components/modals/modals-root";
import {ModalProvider} from "@/contexts/ModalsContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
        <ModalProvider>
            <ModalsRoot/>
            <Component {...pageProps} />
        </ModalProvider>
    </Layout>
  )
}
