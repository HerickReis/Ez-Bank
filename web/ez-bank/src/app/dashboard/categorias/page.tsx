"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, PlusCircle } from "lucide-react";

interface Categoria {
  pkIdCategoria: number;
  nmCategoria: string;
}

export default function CategoriasPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [novaCategoria, setNovaCategoria] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategorias = async () => {
    setIsLoading(true);
    setErro(null);
    try {
      const response = await fetch(
        `http://localhost:8080/api/categorias` //
      );
      if (response.ok) {
        const data: Categoria[] = await response.json();
        setCategorias(data);
      } else {
        const erroData = await response.json();
        throw new Error(erroData.message || "Falha ao buscar categorias.");
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
      fetchCategorias();
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErro(null);

    try {
      const response = await fetch("http://localhost:8080/api/categorias", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nmCategoria: novaCategoria }), 
      });

      if (response.ok) {
        setNovaCategoria("");
        await fetchCategorias(); 
      } else {
        const erroData = await response.json();

        throw new Error(erroData.message || "Falha ao criar categoria.");
      }
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      return;
    }
    
    setErro(null);
    try {
      const response = await fetch(`http://localhost:8080/api/categorias/${id}`, { 
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCategorias(); // Recarrega a lista
      } else {
        const erroData = await response.json();
        throw new Error(erroData.message || "Falha ao deletar categoria.");
      }
    } catch (error) {
      if (error instanceof Error) setErro(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-green-800 text-white p-8">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-zinc-300 text-3xl font-bold">
          Gerenciar Categorias
        </h1>
      </header>

      <section className="mb-12">
        <form onSubmit={handleSubmit} className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="nova-categoria" className="block text-sm font-medium text-zinc-400 mb-2">
              Nome da Nova Categoria
            </label>
            <input
              id="nova-categoria"
              type="text"
              value={novaCategoria}
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Ex: Alimentação"
              className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 placeholder:text-zinc-500 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-green-800 text-white p-2 rounded-lg hover:bg-green-700 disabled:bg-zinc-500"
            disabled={isSubmitting}
          >
            <PlusCircle size={20} />
            {isSubmitting ? "Salvando..." : "Adicionar"}
          </button>
        </form>
        {erro && <p className="text-red-400 mt-4">{erro}</p>}
      </section>

      <section>
        {isLoading && <p>Carregando categorias...</p>}
        {!isLoading && !erro && (
          <div className="bg-black rounded-lg p-6">
            <ul className="space-y-4">
              {categorias.length > 0 ? (
                categorias.map((cat) => (
                  <li key={cat.pkIdCategoria} className="flex justify-between items-center">
                    <p className="font-bold">{cat.nmCategoria}</p>
                    <button
                      onClick={() => handleDelete(cat.pkIdCategoria)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))
              ) : (
                <p>Nenhuma categoria encontrada.</p>
              )}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}