'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Enterprise System
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/hrms"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/hrms')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              HRMS
            </Link>
            <Link
              href="/crm"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/crm')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              CRM
            </Link>
            <Link
              href="/dms"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/dms')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              DMS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
