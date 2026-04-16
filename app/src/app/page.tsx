import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-row">
      <div className='basis-1/3'>
        
      </div>
      <div className='basis-2/3'>

        <h1 className="text-4xl font-bold">Bem-vindo à Home!</h1>

        {/* Navegação instantânea sem recarregar o browser */}
        <Link
          href="/contato"
          className="mt-4 text-blue-400 underline hover:text-blue-300"
        >
          Ir para a página de Contato
        </Link>
      </div>
    </div>
  );
}