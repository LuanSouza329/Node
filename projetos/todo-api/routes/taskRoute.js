import express from "express"
import { body, param, query } from "express-validator";
import { validate } from "../middleware/validate.js";
import TaskController from "../controllers/TaskController.js";

const router = express.Router();

router.get("/", TaskController.getAllTask);

router.get("/:id",
    [
        param("id")
            .isInt().withMessage("O ID deve ser um número inteiro"),
            validate
    ],
    TaskController.getTask);

router.post("/", TaskController.createTask);
router.put("/:id", TaskController.updateTask);


export default router;