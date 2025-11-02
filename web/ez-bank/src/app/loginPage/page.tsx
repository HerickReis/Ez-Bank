export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-800 px-6 relative">
      <h1 className="text-zinc-400 text-2xl font-bold text-center mb-32">
        Faça login para continuar
      </h1>

      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded-2xl bg-zinc-400 text-black"
        />
        <input
          type="password"
          placeholder="Senha"
          className="p-2 rounded-2xl bg-zinc-400 text-black"
        />
        <button className="bg-green-800 text-white p-2 rounded-2xl">
          Entrar
        </button>
        <button className="bg-green-800 text-white p-2 rounded-2xl"
        >Criar uma conta</button>
      </form>
    </div>
  );
}
