import { RoutePath } from './RoutePath';

export interface NavItem {
  title: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  {
    title: 'Home',
    href: RoutePath.Home,
  },
];
