import { AppHeader } from '@/components/AppHeader';
import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader />
      <Outlet />
    </div>
  );
}
