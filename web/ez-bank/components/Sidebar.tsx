"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, ArrowLeftRight, Shapes, User, LogOut, Menu } from "lucide-react"; // 1. Importe o ícone 'Menu'

// 2. Defina as Props que o componente espera receber do Layout
interface SidebarProps {
  isOpen: boolean;
  toggle: () => void; // Uma função que não retorna nada
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) { // 3. Use as props
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    router.push("/loginPage");
  };

  const baseLinkClass = "flex items-center gap-3 p-3 rounded-lg";
  const activeLinkClass = "bg-green-800";
  const inactiveLinkClass = "hover:bg-zinc-800";

  return (
    // 4. A largura do <aside> agora é dinâmica e animada
    <aside 
      className={`h-screen bg-black text-white flex flex-col fixed transition-all duration-300
                  ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* 5. Header do Sidebar com Logo e Botão de Toggle */}
      <header className="p-4 flex items-center justify-between">
        {/* O logo só aparece se o menu estiver aberto */}
        <div className={`overflow-hidden transition-all ${isOpen ? 'w-36' : 'w-0'}`}>
          <Image 
            src="/logo.svg" 
            alt="Ez-Bank Logo" 
            width={144} 
            height={36}
          />
        </div>
        <button onClick={toggle} className="p-2 hover:bg-zinc-800 rounded-lg">
          <Menu size={20} />
        </button>
      </header>
      
      {/* 6. Menu de Navegação */}
      <nav className="flex-1 px-4 space-y-2">
        <Link 
          href="/dashboard"
          className={`${baseLinkClass} ${pathname === '/dashboard' ? activeLinkClass : inactiveLinkClass} ${!isOpen && 'justify-center'}`}
        >
          <LayoutDashboard size={20} />
          {/* O <span> só é renderizado se 'isOpen' for true */}
          <span className={!isOpen ? 'hidden' : ''}>Home</span>
        </Link>
        <Link 
          href="/transacoes"
          className={`${baseLinkClass} ${pathname.startsWith('/transacoes') ? activeLinkClass : inactiveLinkClass} ${!isOpen && 'justify-center'}`}
        >
          <ArrowLeftRight size={20} />
          <span className={!isOpen ? 'hidden' : ''}>Transações</span>
        </Link>
        <Link 
          href="/categorias"
          className={`${baseLinkClass} ${pathname.startsWith('/categorias') ? activeLinkClass : inactiveLinkClass} ${!isOpen && 'justify-center'}`}
        >
          <Shapes size={20} />
          <span className={!isOpen ? 'hidden' : ''}>Categorias</span>
        </Link>
        <Link 
          href="/dashboard/perfil"
          className={`${baseLinkClass} ${pathname.startsWith('/dashboard/perfil') ? activeLinkClass : inactiveLinkClass} ${!isOpen && 'justify-center'}`}
        >
          <User size={20} />
          <span className={!isOpen ? 'hidden' : ''}>Perfil</span>
        </Link>
      </nav>

      {/* 7. Botão de Sair (no final da tela) */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className={`${baseLinkClass} w-full ${inactiveLinkClass} ${!isOpen && 'justify-center'}`}
        >
          <LogOut size={20} />
          <span className={!isOpen ? 'hidden' : ''}>Sair</span>
        </button>
      </div>
    </aside>
  );
}