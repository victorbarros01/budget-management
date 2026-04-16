// Este é um Server Component por padrão (roda no servidor)
export default function ContatoPage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Página de Contato</h1>
      <p className="mb-6 text-gray-600">
        Esta é a sua primeira rota criada manualmente no Next.js!
      </p>
      
      {/* Exemplo de um formulário simples */}
      <form className="flex flex-col gap-4 max-w-sm">
        <input 
          type="text" 
          placeholder="Seu Nome" 
          className="border p-2 rounded text-black"
        />
        <button 
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}