'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { Button } from './ui/button';
import { Menu, Search, X } from 'lucide-react';
interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'Business', href: '/' },
  { name: 'Banking', href: '/banking' },
  { name: 'Economy', href: '/' },
  { name: 'Markets', href: '/markets' },
  { name: 'Technology', href: '/' },
  { name: 'Sports', href: '/sports' },
  { name: 'About Us', href: '/about' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = useRouter();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <nav className='bg-[#0A2647] text-white shadow-md'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          {/* logo */}
          <div className='flex-shrink-0'>
            <Link 
              href='/'
              className='text-2xl font-bold'
            >
              Nairametrics 
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-[#144272] transition-colors ${
                pathname.pathname === item.href && item.href !== '/' ? 'bg-[#144272]' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* right side icons */}
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSearch} 
              className="hover:bg-[#144272]"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden hover:bg-[#144272]"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

        </div>
        {/* Search bar */}
        {searchOpen && (
          <div className="py-3 border-t border-[#144272]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full bg-white text-gray-800 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2C74B3]"
              />
              <Button 
                size="icon" 
                className="absolute right-1 top-1 bg-[#2C74B3] hover:bg-[#205295]"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
        
      </div>
      
      {/* mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A2647]">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-[#205295] transition-colors ${
                  location.pathname === item.href && item.href !== '/' ? 'bg-[#205295]' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar