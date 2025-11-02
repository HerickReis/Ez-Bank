"use client";


import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  
  const [isLoading, setIsLoading] = useState(false);

  
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    setIsLoading(true); 

    const loginData = {
      email: email,
      senha: senha,
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const usuarioLogado = await response.json();
        console.log("Login bem-sucedido!", usuarioLogado);


        alert(`Bem-vindo, ${usuarioLogado.nmUsuario}!`); 
        router.push("/dashboard"); 
      } else {
        const erroData = await response.json();
        console.error("Falha no login:", erroData.message);
        setErro(erroData.message); 
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      setErro("Não foi possível conectar ao servidor. Tente novamente.");
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-800 px-6 relative">
      <h1 className="text-zinc-400 text-2xl font-bold text-center mb-32">
        Faça login para continuar
      </h1>

      {erro && (
        <div className="bg-red-200 border border-red-500 text-red-800 p-3 rounded-2xl mb-4 text-center">
          {erro}
        </div>
      )}

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Senha"
            className="p-2 rounded-2xl bg-zinc-400 text-black placeholder:text-zinc-600"
            required
          />

          <button
            type="submit"
            className="bg-green-800 text-white p-2 rounded-2xl disabled:bg-zinc-500"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <Link
          href="/registerPage"
          className="bg-green-800 text-white p-2 rounded-2xl text-center"
        >
          Criar uma conta
        </Link>
      </div>
    </div>
  );
}
