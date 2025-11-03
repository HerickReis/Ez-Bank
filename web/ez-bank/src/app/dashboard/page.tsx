"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import TransacaoList from "@/components/TransacaoList";

interface Conta {
  id: number;
  saldoAtual: number;
  cpf?: string;
  cnpj?: string;
  razaoSocial?: string;
  tipo_conta: string;
}

interface Transacao {
  idTransacao: number;
  dataTransacao: string; //  "dd/MM/yyyy"
  tipo: string; // "ENTRADA" ou "SAIDA"
  valor: number;
  categoria: {
    id: number;
    nome: string;
  };
  conta: {
    id: number;
    documento: string;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [isLoadingContas, setIsLoadingContas] = useState(true); // Loading separado
  const [isLoadingTransacoes, setIsLoadingTransacoes] = useState(true); // Loading separado
  const [erro, setErro] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (!userId) {
      router.push("/loginPage");
      return;
    }
    setUserName(storedUserName);

    const fetchData = async () => {
      setErro(null);
      setIsLoadingContas(true);
      setIsLoadingTransacoes(true);

      // Contas
      try {
        const responseContas = await fetch(
          `http://localhost:8080/api/contas/por-usuario/${userId}`
        );
        if (responseContas.ok) {
          const dataContas: Conta[] = await responseContas.json();
          setContas(dataContas);
        } else {
          throw new Error("Falha ao buscar contas.");
        }
      } catch (error) {
        if (error instanceof Error) setErro(error.message);
      } finally {
        setIsLoadingContas(false);
      }

      // Transacoes
      try {
        const responseTransacoes = await fetch(
          `http://localhost:8080/api/transacoes/por-usuario/${userId}`
        );

        if (responseTransacoes.ok) {
          const dataTransacoes: Transacao[] = await responseTransacoes.json();
          setTransacoes(dataTransacoes);
        } else {
          throw new Error("Falha ao buscar transações.");
        }
      } catch (error) {
        if (error instanceof Error) setErro(error.message);
      } finally {
        setIsLoadingTransacoes(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoadingContas || !userName) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gradient-to-b from-black to-green-800">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-green-800 text-white p-8">
      <header className="mb-12">
        <h1 className="text-zinc-300 text-3xl font-bold">Olá, {userName}!</h1>
        <p className="text-zinc-400">Seu resumo financeiro está aqui.</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          Minhas Contas
        </h2>
        {isLoadingContas && <p>Carregando contas...</p>}
        {erro && !isLoadingContas && <p className="text-red-400">{erro}</p>}

        <div className="flex space-x-6 overflow-x-auto pb-4">
          {!isLoadingContas && contas.length > 0
            ? contas.map((conta) => (
                <div
                  key={conta.id}
                  className="bg-black p-6 rounded-lg shadow-lg w-72 flex-shrink-0"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {conta.razaoSocial ? conta.razaoSocial : "Conta Pessoal"}
                  </h3>
                  <p className="text-zinc-400 mb-4">
                    {conta.cpf ? `CPF: ${conta.cpf}` : `CNPJ: ${conta.cnpj}`}
                  </p>
                  <p className="text-2xl font-bold text-green-500">
                    {formatCurrency(conta.saldoAtual)}
                  </p>
                </div>
              ))
            : !isLoadingContas && !erro && <p>Nenhuma conta encontrada.</p>}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          Últimas Transações
        </h2>

        {isLoadingTransacoes && <p>Carregando transações...</p>}

        {!isLoadingTransacoes && !erro && (
          <TransacaoList transacoes={transacoes.slice(0, 5)} />
        )}
      </section>
    </div>
  );
}
