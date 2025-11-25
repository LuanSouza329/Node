import Task from "../model/Task.js";
import AppError from "../util/AppError.js";
import { asyncHandler } from "../middleware/asyncMiddleWare.js";

export default class TaskController {
    static getAllTask = asyncHandler(async (req, res, next) => {

        const tasks = await Task.getAllTask();

        if (!tasks) {
            return next(new AppError("Tasks não encontrada", 404));
        }

        res.status(200).json({
            tasks
        });
    })

    static createTask = asyncHandler(async (req, res, next) => {
        const { titulo, descricao } = req.body;


        if (!titulo || !descricao) {
            return next(new AppError("Os campos título e descrição são obrigatórios", 400));
        }

        const netTask = await Task.createTask(titulo, descricao);

        res.status(201).json({
            message: "Task criada com sucesso",
            tasks: netTask
        });
    })

    static getTask = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const task = await Task.getTask(id);

        if (!task) {
            return next(new AppError("Task não encontrada ou não existente", 404));
        }

        res.status(200).json(task)
    });

    static updateTask = asyncHandler(async (req, res,next) => {
        const { id } = req.params;

        const { titulo, descricao } = req.body;

        if (!titulo || !descricao) {
            return next(new AppError("Os campos título e descrição são obrigatórios", 400));
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

    static deleteTask = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const deleted = await Task.deleteTask(id);

        if (!deleted) {
            return next(new AppError ("Erro ao deletar Task ou Task não encontrada", 404));
        }

        res.status(200).json({
            message: "Task deletada com sucesso"
        })
    })
}


