import express from "express"
import { body, param, query } from "express-validator";
import { validate } from "../middleware/validate.js";
import TaskController from "../controllers/TaskController.js";

const router = express.Router();

router.get("/", TaskController.getAllTask);

router.get("/:id",
    [
        param("id")
            .isInt().withMessage("O ID deve ser um número inteiro")
            .trim(),
        validate
    ],
    TaskController.getTask);

router.post("/",
    body("titulo")

        .trim().notEmpty().withMessage("Titulo é um campo obrigatório")
        .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo título é 3")
        .escape(),

    body("descricao")
        .trim().notEmpty().withMessage("Descricao é um campo obrigatório")
        .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo descricao é 3")
        .escape(),

    validate,
    TaskController.createTask);

router.put("/:id",
    [
        param("id")
            .isInt().withMessage("O ID deve ser um número inteiro")
            .trim(),

        body("titulo")

            .trim().notEmpty().withMessage("Titulo é um campo obrigatório")
            .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo título é 3")
            .escape(),

        body("descricao")
            .trim().notEmpty().withMessage("Descricao é um campo obrigatório")
            .isLength({ min: 3 }).withMessage("O tamanho mínimo do campo descricao é 3")
            .escape(),

        validate,
    ],
    TaskController.updateTask);

router.delete("/:id",
    [
        param("id")
            .isInt().withMessage("O ID deve ser um número inteiro")
            .trim(),
        validate
    ],
    TaskController.deleteTask);


export default router;