'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-4 md:px-10 flex items-center justify-between relative flex-wrap">
      {/* Left: Logo and Site Name */}
      <Link href="/" className="flex items-center space-x-3">
        <div className="relative w-16 h-26">
          <Image
            src="/images/logo.jpeg"
            alt="Wilderness Royale Logo"
            fill
            className="object-contain"
            sizes="64px"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-xl md:text-2xl font-bold text-[#8B4513] tracking-wide">Wilderness</span>
          <span className="text-lg md:text-4xl font-semibold text-green-700 tracking-wide" style={{ fontFamily: 'SCRIPTIN' }}>
            Royale
          </span>
        </div>
      </Link>

      {/* Center: Search bar for desktop */}
      <div className="hidden md:flex flex-grow justify-center px-6">
        <input
          type="text"
          placeholder="Search your adventure..."
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Right: Navigation Links for desktop */}
      <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
        <li><Link href="/">Home</Link></li>
        <li><Link href="/destination">Destination</Link></li>
        <li><Link href="/safaris">Safaris Package</Link></li>
        <li><Link href="/themed-holiday">Themed Holiday</Link></li>
        <li><Link href="/local-packages">Local Packages</Link></li>
      </ul>

      {/* Mobile: Hamburger Button */}
      <div className="md:hidden ml-auto">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile: Dropdown Menu */}
      {isOpen && (
        <ul className="absolute top-20 left-0 w-full bg-white shadow-md text-center md:hidden z-50">
          <li className="py-2 border-b"><Link href="/">Home</Link></li>
          <li className="py-2 border-b"><Link href="/destination">Destination</Link></li>
          <li className="py-2 border-b"><Link href="/safaris">Safaris Package</Link></li>
          <li className="py-2 border-b"><Link href="/themed-holiday">Themed Holiday</Link></li>
          <li className="py-2 border-b"><Link href="/local-packages">Local Packages</Link></li>
          {/* Mobile search bar */}
          <li className="py-4 px-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </li>
        </ul>
      )}
    </nav>
  );
}
