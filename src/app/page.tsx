'use client';

import { MainLayout } from '@/components/templates';
import HomePages from './home/page';

export default function Home() {
  return (
    <MainLayout>
      <HomePages />
    </MainLayout>
  );
}
