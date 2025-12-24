import { Icons } from '../Icons';
import { mainNavItems } from '@/config/main-nav';
import { siteConfig } from '@/config/site';
import { NavLink } from 'react-router';

export function MainNav() {
  return (
    <div className="flex gap-4 lg:gap-6">
      <div className="flex items-center gap-x-2">
        <Icons.dog className="size-6" />
        <span className="font-semibold dark:font-bold">{siteConfig.name}</span>
      </div>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {mainNavItems.map((item) => (
          <NavLink
            className="transition-colors text-foreground/60 hover:text-foreground/80 aria-[current=page]:text-foreground"
            key={item.href}
            to={item.href}
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
