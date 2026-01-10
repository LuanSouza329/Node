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

    static updateTask = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const { titulo, descricao } = req.body;

        if (!titulo || !descricao) {
            return next(new AppError("Os campos título e descrição são obrigatórios", 400));
        }

        const updatedTask = await Task.updateTask(id, titulo, descricao);

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task não encontrada ou não existente",
            });
        }

        res.status(200).json({
            message: "Task atualizada com sucesso",
            task: updatedTask
        });
    });

    static updateTitle = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const { titulo } = req.body;

        if (!titulo) {
            return next(new AppError("O campo título é obrigatório", 400));
        }

        const updatedTitle = await Task.updateTitle(id, titulo);

        if (!updatedTitle) {
            return res.status(404).json({
                message: "Task não encontrada ou não existente",
            });
        }

        res.status(200).json({
            message: "Titulo atualizado com sucesso",
            task: updatedTitle
        });
    });

    static updateDescription = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const { descricao } = req.body;

        if (!descricao) {
            return next(new AppError("O campo descrição é obrigatório", 400));
        }

        const updatedDescription = await Task.updateDescription(id, descricao);

        if (!updatedDescription) {
            return res.status(404).json({
                message: "Task não encontrada ou não existente",
            });
        }

        res.status(200).json({
            message: "Descrição atualizado com sucesso",
            task: updatedDescription
        });
    });

    static updateStatus = asyncHandler(async (req, res, next) => {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return next(new AppError("O status é obrigatório para atualização", 400));
        }

        const updated = await Task.updateStatus(id, status);

        if (!updated) {
            return res.status(404).json({
                message: "Task não encontrada",
            });
        }

        res.status(200).json({
            message: "Status atualizado com sucesso",
            task: updated
        });
    });

    static deleteTask = asyncHandler(async (req, res, next) => {
        const { id } = req.params;

        const deleted = await Task.deleteTask(id);

        if (!deleted) {
            return next(new AppError("Erro ao deletar Task ou Task não encontrada", 404));
        }

        res.status(200).json({
            message: "Task deletada com sucesso"
        })
    })
}


