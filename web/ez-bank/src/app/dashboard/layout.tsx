"use client"; // 1. PRECISA ser um Client Component para usar estado

import { useState } from "react";
import Sidebar from "@/components/Sidebar"; // Assumindo que você moveu para @/components

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 2. Estado que controla se o menu está aberto ou fechado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 3. Função para o Sidebar se comunicar com o Layout
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-black">
      {/* 4. Passamos o estado (isOpen) e a função (toggle) para o Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />

      {/* 5. O <main> agora muda a margem dinamicamente */}
      <main 
        className={`flex-1 h-screen overflow-y-auto transition-all duration-300
                    ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}
      >
        {children} {/* Aqui é onde a 'page.tsx' será renderizada */}
      </main>
    </div>
  );
}