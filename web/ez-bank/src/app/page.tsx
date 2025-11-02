import Image from "next/image"
import Link from "next/link";

export default function Home() {
  return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-green-800 px-6 relative">
        <Image
          src="/logo.svg"
          alt="Logo do Ez Bank"
          width={240}
          height={240}
          className="absolute top-2 left-2"
        />

      <h1 className="text-zinc-400 text-2xl font-bold text-center mb-32">
        Seja bem-vindo, este é o local perfeito para descomplicar sua vida
        financeira!
      </h1>

      <Link href="/loginPage" className="bg-green-800 text-white p-2 rounded-2xl text-center">
        Acesse sua conta
      </Link>
    </div>
  );
}
