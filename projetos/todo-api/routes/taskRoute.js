import express from "express"

import TaskController from "../controllers/taskController.js";

const router = express.Router();

router.get("/", TaskController.getAllTask);
router.post("/", TaskController.createTask) ;


export default router;