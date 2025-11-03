"use client";

import React, { useState, useEffect } from "react";
import { X } from 'lucide-react';

interface Conta {
  id: number;
  cpf?: string;
  razaoSocial?: string;
}

interface Categoria {
  pkIdCategoria: number;
  nmCategoria: string;
}


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function AddTransacaoModal({ isOpen, onClose, onSave }: ModalProps) {

  const [idConta, setIdConta] = useState("");
  const [idCategoria, setIdCategoria] = useState("");
  const [tipo, setTipo] = useState("SAIDA");
  const [valor, setValor] = useState("");
  const [dataTransacao, setDataTransacao] = useState(new Date().toISOString().split('T')[0]); // Formato yyyy-MM-dd
  

  const [contas, setContas] = useState<Conta[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setErro("Usuário não encontrado. Faça login novamente.");
        return;
      }
      
      const fetchDataForForm = async () => {
        setIsLoading(true);
        try {
          // 1. Buscar Contas
          const resContas = await fetch(`http://localhost:8080/api/contas/por-usuario/${userId}`); 
          if (!resContas.ok) throw new Error("Erro ao buscar contas");
          const dataContas: Conta[] = await resContas.json();
          setContas(dataContas);

          
          const resCategorias = await fetch(`http://localhost:8080/api/categorias`); 
          if (!resCategorias.ok) throw new Error("Erro ao buscar categorias");
          const dataCategorias: Categoria[] = await resCategorias.json();
          setCategorias(dataCategorias);

        } catch (error) {
          if (error instanceof Error) setErro(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchDataForForm();
    }
  }, [isOpen]); 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setIsLoading(true);


    const [year, month, day] = dataTransacao.split('-');
    const formattedDate = `${day}/${month}/${year}`;

    const transacaoData = {
      idConta: parseInt(idConta),
      idCategoria: parseInt(idCategoria),
      dataTransacao: formattedDate,
      tipo: tipo,
      valor: parseFloat(valor),
    };

    try {
      const response = await fetch("http://localhost:8080/api/transacoes", { //
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transacaoData),
      });

      if (response.ok) {
        onSave(); 
      } else {
        const erroData = await response.json();
        throw new Error(erroData.message || "Falha ao criar transação.");
      }
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      
      <div className="bg-zinc-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Nova Transação</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {erro && (
          <div className="bg-red-200 border border-red-500 text-red-800 p-3 rounded-lg mb-4 text-center">
            {erro}
          </div>
        )}

        {isLoading && <p>Carregando...</p>}

        {!isLoading && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Tipo */}
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700"
            >
              <option value="SAIDA">Saída (Gasto)</option>
              <option value="ENTRADA">Entrada (Renda)</option>
            </select>

            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Valor (ex: 50.99)"
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder:text-zinc-500"
              required
            />
            
            {/* Data */}
            <input
              type="date"
              value={dataTransacao}
              onChange={(e) => setDataTransacao(e.target.value)}
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700"
              required
            />

            {/* Contas */}
            <select
              value={idConta}
              onChange={(e) => setIdConta(e.target.value)}
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700"
              required
            >
              <option value="" disabled>Selecione uma conta</option>
              {contas.map(conta => (
                <option key={conta.id} value={conta.id}>
                  {conta.razaoSocial ? conta.razaoSocial : `Pessoal (${conta.cpf})`}
                </option>
              ))}
            </select>
            
            {/* Categorias */}
            <select
              value={idCategoria}
              onChange={(e) => setIdCategoria(e.target.value)}
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700"
              required
            >
              <option value="" disabled>Selecione uma categoria</option>
              {categorias.map(cat => (
                <option key={cat.pkIdCategoria} value={cat.pkIdCategoria}>
                  {cat.nmCategoria}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-green-800 text-white p-2 rounded-lg disabled:bg-zinc-500"
              disabled={isLoading}
            >
              {isLoading ? "Salvando..." : "Salvar Transação"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}