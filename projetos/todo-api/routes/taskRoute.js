import express from "express"

import TaskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/", TaskController.getAllTask);
router.get("/:id", TaskController.getTask);
router.post("/", TaskController.createTask);


export default router;