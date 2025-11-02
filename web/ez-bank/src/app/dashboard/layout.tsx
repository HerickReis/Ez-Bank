import Sidebar from "@/components/Sidebar";


export default function DashboardLayout({
  children, // 'children' será a página (page.tsx)
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black">
      {/* 1. O Menu Lateral */}
      <Sidebar />

      {/* 2. O Conteúdo Principal */}
      <main className="flex-1 h-screen overflow-y-auto ml-64"> 
        {/* ml-64 (margem-esquerda) é crucial! É a largura exata do Sidebar */}
        {children} {/* Aqui é onde a 'page.tsx' será renderizada */}
      </main>
    </div>
  );
}