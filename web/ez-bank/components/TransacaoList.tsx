"use client";

import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

interface Transacao {
  idTransacao: number;
  dataTransacao: string;
  tipo: string;
  valor: number;
  categoria: {
    nome: string;
  };
  conta: {
    id: number;
    documento: string;
  };
}

interface TransacaoListProps {
  transacoes: Transacao[]; 
}

const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function TransacaoList({ transacoes }: TransacaoListProps) {
  
  if (transacoes.length === 0) {
    return <p>Nenhuma transação encontrada.</p>;
  }

  return (
    <div className="bg-black rounded-lg p-6">
      <ul className="space-y-4">
        {transacoes.map((trans) => (
          <li key={trans.idTransacao} className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {trans.tipo.toUpperCase() === 'ENTRADA' ? (
                <ArrowUpCircle className="text-green-500" />
              ) : (
                <ArrowDownCircle className="text-red-500" />
              )}
              <div>
                <p className="font-bold">{trans.categoria.nome}</p>
                <p className="text-sm text-zinc-400">{trans.conta.documento ? trans.conta.documento : `Conta ID: ${trans.conta.id}`}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-bold ${trans.tipo.toUpperCase() === 'ENTRADA' ? 'text-green-500' : 'text-red-500'}`}>
                {trans.tipo.toUpperCase() === 'ENTRADA' ? '+' : '-'} {formatCurrency(trans.valor)}
              </p>
              <p className="text-sm text-zinc-400">{trans.dataTransacao}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
