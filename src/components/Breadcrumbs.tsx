"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    if (pathname.startsWith('/character-selection')) {
      items.push({ label: 'Character Selection', href: '/character-selection', current: true });
    } else if (pathname.startsWith('/agent-introduction')) {
      items.push({ label: 'Character Selection', href: '/character-selection' });
      items.push({ label: 'Meet Your Agent', href: pathname, current: true });
    } else if (pathname.startsWith('/journey')) {
      items.push({ label: 'Your Journey', href: '/journey', current: true });
    } else if (pathname.startsWith('/level/')) {
      const levelMatch = pathname.match(/\/level\/(\d+)/);
      const levelId = levelMatch ? parseInt(levelMatch[1]) : 0;

      items.push({ label: 'Your Journey', href: '/journey' });
      items.push({ label: `Level ${levelId}`, href: pathname, current: true });
    } else if (pathname.startsWith('/login')) {
      items.push({ label: 'Sign In', href: '/login', current: true });
    } else if (pathname.startsWith('/signup')) {
      items.push({ label: 'Sign Up', href: '/signup', current: true });
    } else if (pathname.startsWith('/privacy')) {
      items.push({ label: 'Privacy Policy', href: '/privacy', current: true });
    } else if (pathname.startsWith('/terms')) {
      items.push({ label: 'Terms of Service', href: '/terms', current: true });
    }

    return items;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-white/60 mb-6">
      {breadcrumbs.map((item, index) => (
        <div key={item.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="w-4 h-4 mx-2 text-white/40" />
          )}

          {item.current ? (
            <span className="text-white font-medium flex items-center gap-1">
              {index === 0 && <Home className="w-3 h-3" />}
              {item.label}
            </span>
          ) : (
            <Link
              href={item.href}
              className="hover:text-white/80 transition-colors flex items-center gap-1"
            >
              {index === 0 && <Home className="w-3 h-3" />}
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}