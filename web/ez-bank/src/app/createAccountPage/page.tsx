"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateAccountPage() {
  const router = useRouter();


  const [tipoConta, setTipoConta] = useState("FISICA");

  const [saldoAtual, setSaldoAtual] = useState("0.00");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");

  const [userId, setUserId] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {

      alert("Erro: Usuário não encontrado. Faça o login.");
      router.push("/loginPage");
    } else {
      setUserId(storedUserId);
    }
  }, [router]);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      setErro("ID do usuário não encontrado. Tente fazer login novamente.");
      return;
    }

    setErro(null);
    setIsLoading(true);

    const contaData = {
      usuarioId: parseInt(userId), 
      saldoAtual: parseFloat(saldoAtual),
      tipoConta: tipoConta, // "FISICA" ou "JURIDICA"
      cpf: tipoConta === "FISICA" ? cpf : null,
      cnpj: tipoConta === "JURIDICA" ? cnpj : null,
      razaoSocial: tipoConta === "JURIDICA" ? razaoSocial : null,
    };

    try {
      // Chama a API de /api/contas
      const response = await fetch("http://localhost:8080/api/contas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contaData),
      });

      if (response.ok) {

        alert("Conta criada com sucesso!");
        router.push("/dashboard");
      } else {

        const erroData = await response.json();
        setErro(erroData.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setErro(error.message);
      } else {
        setErro("Não foi possível conectar ao servidor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-800 px-6 relative">
      <h1 className="text-zinc-400 text-2xl font-bold text-center mb-16">
        Crie sua primeira conta
      </h1>

      {erro && (
        <div className="bg-red-200 border border-red-500 text-red-800 p-3 rounded-2xl mb-4 text-center w-full max-w-sm">
          {erro}
        </div>
      )}

      <form
        onSubmit={handleCreateAccount}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <select
          value={tipoConta}
          onChange={(e) => setTipoConta(e.target.value)}
          className="p-2 rounded-2xl bg-zinc-400 text-black"
        >
          <option className="text-black" value="FISICA">Conta Física (PF)</option>
          <option className="text-black" value="JURIDICA">Conta Jurídica (PJ)</option>
        </select>

        {tipoConta === "FISICA" && (
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF (apenas números)"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-800"
            required
          />
        )}

        {tipoConta === "JURIDICA" && (
          <>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="CNPJ (apenas números)"
              className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
              required
            />
            <input
              type="text"
              value={razaoSocial}
              onChange={(e) => setRazaoSocial(e.target.value)}
              placeholder="Razão Social"
              className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="bg-green-800 text-white p-2 rounded-2xl disabled:bg-zinc-500"
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Finalizar Cadastro"}
        </button>
      </form>
    </div>
  );
}
