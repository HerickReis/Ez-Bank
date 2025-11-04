"use client"; 

import { useState } from "react";
import Sidebar from "@/components/Sidebar"; 
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Estado que controla se o menu está aberto ou fechado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Função para o Sidebar se comunicar com o Layout
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-black">
      
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      <main 
        className={`flex-1 h-screen overflow-y-auto transition-all duration-300
                    ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        {children} 
      </main>
    </div>
  );
}