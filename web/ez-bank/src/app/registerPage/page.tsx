"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [nmUsuario, setNmUsuario] = useState("");
  const [dsEmail, setDsEmail] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [vlRendaMensal, setVlRendaMensal] = useState("");
  const [txSenha, setTxSenha] = useState("");

  const [erro, setErro] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setIsLoading(true);

    const usurioData = {
      nmUsuario: nmUsuario,
      dsEmail: dsEmail,
      dtNascimento: dtNascimento, // Formato "dd/MM/yyyy"
      vlRendaMensal: parseFloat(vlRendaMensal), // Converter para número
      txSenha: txSenha,
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usurioData),
      });

      if (response.ok) {
        alert("Conta criada com sucesso! faça o Login.");
        router.push("/loginPage");
      } else {
        const erroData = await response.json();
        setErro(erroData.message);
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setErro("Não foi possível conectar com o servidor, Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-800 px-6 relative">
      <h1 className="text-zinc-400 text-2xl font-bold text-center mb-16">
        Crie sua conta Ez-Bank
      </h1>
      {erro && (
        <div className="bg-red-200 border border-red-500 text-red-800 p-3 rounded-2xl mb-4 text-center w-full max-w-sm">
          {erro}
        </div>
      )}
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            value={nmUsuario}
            onChange={(e) => setNmUsuario(e.target.value)}
            placeholder="Nome Completo"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />
          <input
            type="email"
            value={dsEmail}
            onChange={(e) => setDsEmail(e.target.value)}
            placeholder="Email"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />
          <input
            type="password"
            value={txSenha}
            onChange={(e) => setTxSenha(e.target.value)}
            placeholder="Senha"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />
          <input
            type="text"
            value={dtNascimento}
            onChange={(e) => setDtNascimento(e.target.value)}
            placeholder="Data de Nascimento (dd/MM/yyyy)"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />
          <input
            type="number"
            step="0.01" // Permite decimais
            value={vlRendaMensal}
            onChange={(e) => setVlRendaMensal(e.target.value)}
            placeholder="Renda Mensal (ex: 3500.50)"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />

          <button
            type="submit"
            className="bg-green-800 text-white p-2 rounded-2xl disabled:bg-zinc-500"
            disabled={isLoading}
          >
            {isLoading ? "Criando conta..." : "Criar conta"}
          </button>
        </form>

        <Link
          href="/loginPage"
          className="bg-zinc-700 text-white p-2 rounded-2xl text-center"
        >
          Voltar para o Login
        </Link>
      </div>
    </div>
  );
}
