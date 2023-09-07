import React from 'react';
import Header from "@/components/base/header";
import Footer from "@/components/base/footer";

function Layout({ children }: {children: React.ReactNode}) {
    return (
        <>
          <Header />
          <main>{children}</main>
          <Footer />
        </>
    );
}

export default Layout;