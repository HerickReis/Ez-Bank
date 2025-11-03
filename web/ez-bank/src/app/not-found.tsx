import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center text-3xl gap-6">
      <div className="flex-col text-center">
      <h2 className="">Página não encontrada</h2>
      <p>Não foi possível encontrar o recurso solicitado</p>
      </div>
      
      <Link
        className="text-white border-green-800 px-5 rounded-full bg-green-800 "
        href="/dashboard"
      >
        Voltar para a página Inicial
      </Link>
    </div>
  );
}
