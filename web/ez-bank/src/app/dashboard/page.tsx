"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// biblioteca de icones
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Conta {
  pkIdConta: number;
  dsConta: string;
  saldoAtual: number;
  tipoConta: string;
}

// Interface para as Transações
interface Transacao {
  id: number;
  descricao: string;
  valor: number; // Positivo para entrada, negativo para saída
  categoria: string;
  data: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [contas, setContas] = useState<Conta[]>([]);
  const [transacoes, setTransacoes] = useState<Transacao[]>([]); // Estado para transações
  const [isLoading, setIsLoading] = useState(true);
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

    // Função para buscar os dados
    const fetchData = async () => {
      try {
        setErro(null);
        const responseContas = await fetch(
          `http://localhost:8080/api/contas/por-usuario/${userId}` //
        );
        if (responseContas.ok) {
          const data: Conta[] = await responseContas.json();
          setContas(data);
        } else {
          throw new Error("Falha ao buscar contas.");
        }

        setTransacoes([
          {
            id: 1,
            descricao: "Salário",
            valor: 5000,
            categoria: "Renda",
            data: "01/11/2025",
          },
          {
            id: 2,
            descricao: "Padaria",
            valor: -50.2,
            categoria: "Alimentação",
            data: "02/11/2025",
          },
          {
            id: 3,
            descricao: "Conta de Luz",
            valor: -150.0,
            categoria: "Moradia",
            data: "02/11/2025",
          },
        ]);
      } catch (error: any) {
        setErro(error.message || "Não foi possível conectar ao servidor.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (isLoading || !userName) {
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
        {erro && <p className="text-red-400">{erro}</p>}

        <div className="flex space-x-6 overflow-x-auto pb-4">
          {contas.length > 0
            ? contas.map((conta) => (
                <div
                  key={conta.pkIdConta}
                  className="bg-black p-6 rounded-lg shadow-lg w-72 flex-shrink-0"
                >
                  <h3 className="text-xl font-bold mb-2">{conta.dsConta}</h3>
                  <p className="text-zinc-400 mb-4">
                    {conta.tipoConta === "FISICA"
                      ? "Conta Pessoal"
                      : "Conta Empresarial"}
                  </p>
                  <p className="text-2xl font-bold text-green-500">
                    {formatCurrency(conta.saldoAtual)}
                  </p>
                </div>
              ))
            : !erro && <p>Nenhuma conta encontrada.</p>}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">
          Últimas Transações
        </h2>
        <div className="bg-black rounded-lg p-6">
          <ul className="space-y-4">
            {transacoes.map((trans) => (
              <li key={trans.id} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {trans.valor > 0 ? (
                    <ArrowUpCircle className="text-green-500" />
                  ) : (
                    <ArrowDownCircle className="text-red-500" />
                  )}
                  <div>
                    <p className="font-bold">{trans.descricao}</p>
                    <p className="text-sm text-zinc-400">{trans.categoria}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      trans.valor > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {formatCurrency(trans.valor)}
                  </p>
                  <p className="text-sm text-zinc-400">{trans.data}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
