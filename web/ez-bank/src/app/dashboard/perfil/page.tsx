"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import CreateAccountModal from "@/components/CreateAccountModal";

// Interfaces para os dados
interface Usuario {
  nmUsuario: string;
  dsEmail: string;
  dtNascimento: string;
  vlRendaMensal: number;
}
interface Conta {
  id: number;
  cpf?: string;
  cnpj?: string;
}

export default function PerfilPage() {
  const router = useRouter();

  // Estados da página
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // controle do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"FISICA" | "JURIDICA">("FISICA");

  // carrega todos os dados
  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/loginPage");
      return;
    }

    setIsLoading(true);
    setErro(null);

    try {
      // 1. Busca dados do usuário
      const resUser = await fetch(
        `http://localhost:8080/api/usuarios/${userId}`
      ); 
      if (!resUser.ok) throw new Error("Falha ao buscar dados do usuário.");
      const dataUser: Usuario = await resUser.json();
      setUsuario(dataUser);


      const resContas = await fetch(
        `http://localhost:8080/api/contas/por-usuario/${userId}`
      ); 
      if (!resContas.ok) throw new Error("Falha ao buscar contas.");
      const dataContas: Conta[] = await resContas.json();
      setContas(dataContas);
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
      else setErro("Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, [router]);


  const hasFisica = contas.some((conta) => conta.cpf);
  const hasJuridica = contas.some((conta) => conta.cnpj);


  const openModal = (tipo: "FISICA" | "JURIDICA") => {
    setModalType(tipo);
    setIsModalOpen(true);
  };


  const handleSave = () => {
    setIsModalOpen(false);
    fetchData(); 
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black to-green-800">
        <p className="text-white">Carregando perfil...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-green-800 text-white p-8">
        <header className="mb-12">
          <h1 className="text-zinc-300 text-3xl font-bold">Meu Perfil</h1>
        </header>

        {erro && <p className="text-red-400 mb-4">{erro}</p>}

        {usuario && (
          <section className="bg-black p-6 rounded-lg shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">
              Informações Pessoais
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-zinc-400">Nome</p>
                <p className="text-lg font-bold">{usuario.nmUsuario}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Email</p>
                <p className="text-lg font-bold">{usuario.dsEmail}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Data de Nascimento</p>
                <p className="text-lg font-bold">{usuario.dtNascimento}</p>
              </div>
              <div>
                <p className="text-sm text-zinc-400">Renda Mensal</p>
                <p className="text-lg font-bold">
                  {usuario.vlRendaMensal.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>
            </div>
          </section>
        )}


        <section>
          <h2 className="text-2xl font-semibold mb-4 text-green-400">
            Gerenciar Contas
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
          
            <button
              onClick={() => openModal("FISICA")}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 text-white p-4 rounded-lg hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed"
              disabled={hasFisica} 
            >
              <PlusCircle size={20} />
              {hasFisica ? "Conta Física já cadastrada" : "Abrir Conta Física"}
            </button>

            <button
              onClick={() => openModal("JURIDICA")}
              className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 text-white p-4 rounded-lg hover:bg-zinc-700 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed"
              disabled={hasJuridica} 
            >
              <PlusCircle size={20} />
              {hasJuridica
                ? "Conta Jurídica já cadastrada"
                : "Abrir Conta Jurídica"}
            </button>
          </div>
        </section>
      </div>

      <CreateAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        tipoContaParaCriar={modalType}
      />
    </>
  );
}
