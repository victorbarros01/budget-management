import OpenAI from "openai";
import { client } from '../../../IAInit.mjs'
import { category } from "../finance/category.js";

export const categoryInterInvoiceAIHandler = async (list) => {
    const categoryName = list.map(a => a.Categoria);
    const name = list.map(a => a.Lancamento);

    if (!categoryName) {
        return console.error("list.Categoria not a field");
    }
    if (!name) {
        return console.error("list.Lancamento not a field");
    }

    const responseCategory = await client.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        temperature: 0,
        messages: [
            {
                role: 'system', content: `
                        Você é um motor de processamento de dados back-end. 
                                REGRAS CRÍTICAS:
            1. Retorne TODOS os itens enviados, sem omitir nenhum.
            2. Se eu enviar X itens, você deve retornar X itens.
            3. Responda APENAS com os valores separados por vírgula.
            4. Proibido usar reticências (...), explicações ou markdown.
            5. Mantenha a ordem original dos itens.
            6. Certifique-se de processar exatamente X itens.
            7. Extritamente Proibido mandar qualquer tipo de conteúdo que não seja os itens conforme citado a regra 1.
            ` },
            {
                role: 'user',
                content: `Faça uma breve, rápida e objetiva pesquisa para os ${name.length} itens a seguir ${name}, Avalie na mesma ordem dos itens ${name} os ${categoryName.length} itens: ${categoryName}, 
                troque todos de ${categoryName} com base em sua pesquisa realizada considerando que as categorias são: ${category}. Não pule items, não troque original, não adicione categorias que não estejam em ${category}, caso não encontre nada sobre o item pode categorizá-lo com 'OUTROS', retorne apenas a organização de ${categoryName}`
            }
        ]
    });

    return responseCategory.choices[0].message.content.split(',');
}

export const categoryNuBankInvoiceAIHandler = async () => {

}
