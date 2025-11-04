"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import TransacaoList from "@/components/TransacaoList"; 
import AddTransacaoModal from "../../../../components/AddTransacaoModal";
interface Transacao {
  idTransacao: number;
  dataTransacao: string;
  tipo: string;
  valor: number;
  categoria: {
    id: number;
    nome: string;
  };
  conta: {
    id: number;
    tipo: string;
    documento: string;
  };
}

export default function TransacoesPage() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  
  const fetchTransacoes = async (userId: string) => {
    setIsLoading(true);
    setErro(null);
    try {
      const response = await fetch(
        `http://localhost:8080/api/transacoes/por-usuario/${userId}`
      );
      if (response.ok) {
        const data: Transacao[] = await response.json();
        setTransacoes(data);
      } else {
        const erroData = await response.json();
        throw new Error(erroData.message || "Falha ao buscar transações.");
      }
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
      else setErro("Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/loginPage");
    } else {
      fetchTransacoes(userId);
    }
  }, [router]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta transação? O valor será estornado da conta.")) {
      return;
    }
    
    setErro(null);
    try {
      const response = await fetch(`http://localhost:8080/api/transacoes/${id}`, { 
        method: "DELETE",
      });

      if (response.ok) {
        const userId = localStorage.getItem("userId");
        if (userId) await fetchTransacoes(userId); 
      } else {
        const erroData = await response.json();
        throw new Error(erroData.message || "Falha ao deletar transação.");
      }
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
      else setErro("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-black to-green-800 text-white p-8">
        <header className="flex justify-between items-center mb-12">
        </header>

        <section>
          {isLoading && <p>Carregando transações...</p>}
          {erro && <p className="text-red-400">{erro}</p>}
          
          {!isLoading && !erro && (
            <TransacaoList transacoes={transacoes} onDelete={handleDelete} />
          )}
        </section>
      </div>

      <AddTransacaoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => {
          setIsModalOpen(false);
          const userId = localStorage.getItem("userId");
          if (userId) fetchTransacoes(userId);
        }}
      />
    </>
  );
}