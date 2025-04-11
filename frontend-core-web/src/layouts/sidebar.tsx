'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Trang chủ', href: '/', icon: '📊' },
    {name : 'Sự kiện', href:'/events', icon : '📊'},
    { name: 'Upload điểm', href: '/semesters', icon: '📚' },
    { name: 'Điểm sinh viên', href: '/students', icon: '👨‍🎓' },
    
  ];

  return (
    <div 
      className={`h-screen bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } fixed left-0 top-0`}
    >
      <button
        className="absolute -right-3 top-9 bg-gray-800 rounded-full p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '◀' : '▶'}
      </button>

      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <h1 className={`font-bold ${!isOpen && 'hidden'}`}>
            Dashboard
          </h1>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className={`ml-3 ${!isOpen && 'hidden'}`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
