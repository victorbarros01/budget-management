import prisma from '../../lib/prisma.js';

/* GET */
export const getAllBudgets = async (userId) => {
    try {
        const budgets = await prisma.budget.findMany({
            where: { userId: userId }
        });
        return budgets;
    } catch (error) {
        console.error(error);
    }
}

export const getBudgetById = async (id, userId) => {
    try {
        const budget = await prisma.budget.findUnique({
            where: { id: id, userId: userId }
        })
        return budget;
    } catch (error) {
        console.error(error);
    }
}

export const getBudgetByName = async (name, userId) => {
    try {
        const search = await prisma.budget.findMany({
            where: { name: name, userId: userId }
        })
        const budget = search.map((item) => {
            if (item.name || item.amount)
                return item;
        });
        return budget;
    }
    catch (error) {
        console.error(error);
    }
}


/* CREATE */
export const createBudget = async (name, amount, category, type, date, userId) => {
    try {
        const newBudget = await prisma.budget.create({
            data: {
                name: name,
                amount: amount,
                createdAt: date ? new Date(date) : new Date(),
                type: type,
                category: category,
                userId: userId
            }
        });

        if (!newBudget) {
            return console.log('newBudget não existe');
        }

        return newBudget;

    } catch (error) {
        console.error(error);
    }
}

/* UPDATE */
export const updateBudget = async (id, name, amount, userId) => {
    try {
        if (id != null) {

            const updatedBudget = await prisma.budget.update({
                where: { id: id, userId: userId },
                data: {
                    name: name,
                    amount: amount,
                    updatedAt: new Date()
                }
            });
            return updatedBudget;  // <- estava fora do if, bug no original
        }
    } catch (error) {
        console.error(error);
    }
}

/* DELETE */
export const deleteBudget = async (id, userId) => {
    try {
        if (id != null) {
            const deletedBudget = await prisma.budget.delete({
                where: { id: id, userId: userId }
            })
            return deletedBudget;
        }
    } catch (error) {
        console.error(error);
    }
}

export const deleteAllBudgets = async (userId) => {
    try {
        const deletedBudgets = await prisma.budget.deleteMany({
            where: { userId: userId }
        });
        return deletedBudgets;

    } catch (error) {
        console.error(error);
    }
}

export const deleteSelectedsBudgets = async (arr, userId) => {
    try {
        const deletedBudgets = await prisma.budget.deleteMany({
            where: {
                userId: userId,
                id: {
                    in: arr
                }
            }
        });
        return deletedBudgets;
    } catch (error) {
        console.error(error);
    }

}