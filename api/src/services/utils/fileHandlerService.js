import * as agentAIHandlerServices from '../ai/agentAIHandlerServices.js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { createBudget } from '../finance/budgetServices.js';



export const fileHandler = async (file) => {
    // conversão do arquivo para um string
    let data = fs.readFileSync(file, 'utf-8');
    // verificador exclusivo para arquivos do banco inter, arquivo começa com uma string invisivel que atrapalha o fluxo da função.
    if (data.startsWith('\ufeff')) {
        data = data.slice(1);
    }
    // devido as colunas serem pré setadas como propriedade da função, é usado slice para ignorar o primeiro indice deste array(são os títulos originais)
    const records = parse(data, { delimiter: ',', columns: ['Data', 'Lancamento', 'Categoria', 'Tipo', 'Valor'], skip_empty_lines: true, relax_column_count: true }).slice(1);

    const categorys = await agentAIHandlerServices.categoryInterInvoiceAIHandler(records);
    // Como o valor vem assim 'R$ 22,90' é necessário um tratamento para tirar o 'R$' trocar ',' por '.' para transformar em float
    const amount = records.map((a) => {
        const regex = /\d+.\d+/
        const valor = regex.exec(a.Valor.replace(',', '.'))
        return parseFloat(valor[0]);

    });
    const date = records.map(a => {
        const [dia, mes, ano] = a.Data.split('/');

        return new Date(ano, mes - 1, dia);
    });
    let count = 0;
    try {
        if (records.length === categorys.length) {

            for (let i in records) {
                    createBudget(records[i].Lancamento, amount[i], categorys[i], 'Despesa', date[i]);
            }

        }
    } catch (error) {
        console.log(error)
    }

}