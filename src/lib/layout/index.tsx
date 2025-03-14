import type { ReactNode } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Footer from './Footer';
import Header from './Header';
import Meta from './Meta';

import 'react-toastify/dist/ReactToastify.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  return (
    <div>
      <Meta />
      <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center bg-[#FCFCFC]">
        <ToastContainer />
        <Header />
        <SkeletonTheme baseColor="#f7f7f7" highlightColor="#EEEEEE">
          <div className="w-full px-[5%]">{children}</div>
        </SkeletonTheme>
        {pathname !== '/daily-claim' && <Footer />}
      </div>
    </div>
  );
};

export default Layout;
