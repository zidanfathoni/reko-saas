'use client';

import { useTheme } from 'next-themes';
import Footer from '../atoms/footers';
import Header from '../atoms/headers';

type Props = {
  children: JSX.Element | JSX.Element[];
};

const MainLayout: React.FC<Props> = (props) => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen w-screen">
      <Header />
      {props.children}
      <Footer />
    </main>
  );
};

export default MainLayout;
