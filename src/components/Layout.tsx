import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import PageMinimap from './PageMinimap';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex text-on-background font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col lg:pl-72">
        <Header setIsOpen={setIsSidebarOpen} />
        
        <div className="flex-1 flex max-w-[1280px] mx-auto w-full">
          <main className="flex-1 min-w-0 w-full p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
          
          <PageMinimap />
        </div>
      </div>
    </div>
  );
}
