import * as budgetServices from '../services/finance/budgetServices.js';
import { fileHandler } from '../services/utils/fileHandlerService.js';

/* GET */
export const getAllBudgets = async (req, res) => {
    const userId = req.userId;
    try {
        const budgets = await budgetServices.getAllBudgets(userId);
        res.json(budgets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getBudgetById = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        if (!id) {
            return res.status(400).send('Não existe o elemento procurado')
        }
        const budget = await budgetServices.getBudgetById(id, userId);
        if (budget) {
            res.json(budget);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getBudgetByName = async (req, res) => {
    const name = req.params.name;
    const userId = req.userId;
    try {
        const budget = await budgetServices.getBudgetByName(name, userId);
        if (budget) {
            res.json(budget);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/* CREATE */
export const createBudget = async (req, res) => {
    const { name, amount } = req.body;
    const userId = req.userId;
    try {
        const newBudget = await budgetServices.createBudget(name, amount, userId);
        res.status(201).json(newBudget);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

/* POST */
export const postCSVInterInvoiceFile = async (req, res) => {
    const csvFile = req.file?.path;
    const userId = req.userId;
    try {
        await fileHandler(csvFile, userId);

        return res.status(200).json({ message: 'Processo concluído!' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
};


/* UPDATE */
export const updateBudget = async (req, res) => {
    const { id } = req.params;
    const { name, amount } = req.body;
    const userId = req.userId;
    try {

        const updatedBudget = await budgetServices.updateBudget(id, name, amount, userId);
        if (updatedBudget) {
            res.json(updatedBudget);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


/* DELETE */
export const deleteBudget = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    try {
        await budgetServices.deleteBudget(id, userId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteAllBudgets = async (req, res) => {
    const userId = req.userId;
    try {
        await budgetServices.deleteAllBudgets(userId);
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteSelectedsBudgets = async (req, res) => {
    const { arr } = req.body;
    const userId = req.userId;
    try {
        if (!arr) {
            return res.status(400).send('Não possui lista de itens para deletar');
        }
        const response = await budgetServices.deleteSelectedsBudgets(arr, userId);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}