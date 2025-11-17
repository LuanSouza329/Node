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

        if (!titulo && !descricao) {
            return res.status(400).json({
                message: "Titulo e descrição são campos obrigatório"
            });
        }

        const netTask = await Task.createTask(titulo, descricao);

        res.status(200).json({
            message: "Task criada com sucesso",
            tasks: netTask
        });
    })

    static getTask = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const task = await Task.getTask(id);

        if (!task) {
            return res.status(404).json({
                message: `Task não encontrada ou não eistente`
            });
        }

        res.status(200).json(task)
    });

    static updateTask = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const { titulo, descricao } = req.body;

        if (!titulo) {
            return res.status(200).json({
                message: "Titulo e Descrição são campos obrigatórios"
            });
        }

        const updatedTask = await Task.updateTask(id, titulo, descricao);

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task não encontrada"
            });
        }

        res.status(200).json({
            message: "Task atualizada com sucesso",
            task: updatedTask
        });
    })

    static deleteTask = asyncHandler(async (req, res) => {
        const { id } = req.params;

        const deleted = await Task.deleteTask(id);

        if (!deleted) {
            return res.status(404).json({
                message: "Task não encontrada"
            });
        }

        res.status(200).json({
            message: "Task deletada com sucesso"
        })
    })
}


