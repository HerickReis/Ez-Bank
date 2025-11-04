"use client";

import React, { useState, useEffect } from "react";
import { X } from 'lucide-react';

// Props que o modal recebe da página "Perfil"
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  tipoContaParaCriar: "FISICA" | "JURIDICA"; // Define qual formulário mostrar
}

export default function CreateAccountModal({ isOpen, onClose, onSave, tipoContaParaCriar }: ModalProps) {
  // Estados para os campos do formulário
  const [saldoAtual, setSaldoAtual] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Limpa o formulário sempre que o modal é aberto
  useEffect(() => {
    if (isOpen) {
      setSaldoAtual("0.00");
      setCpf("");
      setCnpj("");
      setRazaoSocial("");
      setErro(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErro("ID do usuário não encontrado. Faça login novamente.");
      return;
    }
    
    setErro(null);
    setIsLoading(true);

    // Monta o DTO da Conta
    const contaData = {
      usuarioId: parseInt(userId),
      saldoAtual: parseFloat(saldoAtual),
      tipoConta: tipoContaParaCriar,
      cpf: tipoContaParaCriar === "FISICA" ? cpf : null,
      cnpj: tipoContaParaCriar === "JURIDICA" ? cnpj : null,
      razaoSocial: tipoContaParaCriar === "JURIDICA" ? razaoSocial : null,
    };

    try {
      // Chama a API de /api/contas
      const response = await fetch("http://localhost:8080/api/contas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contaData),
      });

      if (response.ok) {
        alert("Nova conta criada com sucesso!");
        onSave(); // Avisa a página "Perfil" que a conta foi salva
      } else {
        const erroData = await response.json();
        setErro(erroData.message || "Falha ao criar conta.");
      }
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
      else setErro("Não foi possível conectar ao servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    // Fundo escuro do modal
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      {/* Container do Modal  */}
      <div className="bg-zinc-900 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Criar Conta {tipoContaParaCriar === "FISICA" ? "Física" : "Jurídica"}
          </h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {erro && (
          <div className="bg-red-200 border border-red-500 text-red-800 p-3 rounded-lg mb-4 text-center">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Campos Condicionais */}
          {tipoContaParaCriar === "FISICA" && (
            <input
              type="text"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="CPF (apenas números)"
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder:text-zinc-500"
              required
            />
          )}

          {tipoContaParaCriar === "JURIDICA" && (
            <>
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="CNPJ (apenas números)"
                className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder:text-zinc-500"
                required
              />
              <input
                type="text"
                value={razaoSocial}
                onChange={(e) => setRazaoSocial(e.target.value)}
                placeholder="Razão Social"
                className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder:text-zinc-500"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="bg-green-800 text-white p-2 rounded-lg disabled:bg-zinc-500"
            disabled={isLoading}
          >
            {isLoading ? "Criando..." : "Criar Conta"}
          </button>
        </form>
      </div>
    </div>
  );
}