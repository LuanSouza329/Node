import Task from "../model/Task.js";
import { asyncHandler } from "../middleware/asyncMiddleWare.js";

export default class TaskController {
    static getAllTask = asyncHandler(async (req, res) => {

        const tasks = await Task.getAllTask();

        if (!tasks) {
            return res.status(404).json({
                message: "Taks não encontadas ou não há Tasks"
            });
        }

        res.status(200).json({
            tasks
        });
    })

    static createTask = asyncHandler(async (req, res) => {
        const { titulo, descricao } = req.body;

        if (!titulo) {
            return res.status(400).json({
                message: "Titulo é um campo obrigatório"
            });
        }

        const netTask =  await Task.createTask(titulo, descricao);

        res.status(200).json({
            message: "Task criada com sucesso",
            tasks: netTask
        })
    })
}


