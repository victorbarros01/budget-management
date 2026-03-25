import express from 'express';
import * as budgetController from '../controllers/budgetController.js';
import multer from 'multer';
const router = express.Router();
// const fileFilter = (req, res, cb) {
//     if(file.mimetype === "")
// }
const upload = multer({
    dest:'/upload',
    limits:{
        fileSize: 2 * Math.pow(1024, 2),
    }
})
/* GET */
router.get('/allBudgets', budgetController.getAllBudgets)
router.get('/budget/:id', budgetController.getBudgetById);
//router.get(calculoObjetivoGastos)
//router.get()
router.get('/budget/name/:name', budgetController.getBudgetByName);

/* CREATE */
router.post('/budget', budgetController.createBudget);

/*POST*/
router.post('/budget/csv/inter-invoice', upload.single('csv-file'), budgetController.postCSVInterInvoiceFile)

/* UPDATE */
router.put('/budget/:id', budgetController.updateBudget);

/* DELETE */
router.delete('/budget/:id', budgetController.deleteBudget);
router.delete('/budget/:arr', budgetController.deleteAllBudgets);
router.delete('/budget', budgetController.deleteAllBudgets);

export default router;