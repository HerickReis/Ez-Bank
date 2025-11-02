"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
// Importando os ícones que acabamos de instalar
import { LayoutDashboard, ArrowLeftRight, Shapes, User, LogOut } from "lucide-react";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    router.push("/loginPage");
  };

  return (
    <aside className="w-64 h-screen bg-black text-white flex flex-col fixed">
      {/* 2. Logo */}
      <div className="p-6">
        {/* Use o logo que você tem na pasta /public */}
        <Image 
          src="/logo.svg" //
          alt="Ez-Bank Logo" 
          width={200} 
          height={200} 
        />
      </div>

      {/* 3. Menu de Navegação */}
      <nav className="flex-1 px-4">
        {/* Usamos 'Link' do Next.js para navegação SPA */}
        <Link 
          href="/dashboard"
          // Este é o estilo do item "ativo" (verde)
          className="flex items-center gap-3 p-3 rounded-lg bg-green-800"
        >
          <LayoutDashboard size={20} />
          <span>Home</span>
        </Link>
        <Link 
          href="/dashboard/transacoes" // (Página que vamos criar no futuro)
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800"
        >
          <ArrowLeftRight size={20} />
          <span>Transações</span>
        </Link>
        <Link 
          href="/dashboard/categorias" // (Página que vamos criar no futuro)
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800"
        >
          <Shapes size={20} />
          <span>Categorias</span>
        </Link>
        <Link 
          href="/dashboard/perfil" // (Página que vamos criar no futuro)
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-zinc-800"
        >
          <User size={20} />
          <span>Perfil</span>
        </Link>
      </nav>

      {/* 4. Botão de Sair (no final da tela) */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-zinc-800"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}