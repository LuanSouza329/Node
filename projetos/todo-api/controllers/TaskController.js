import Task from "../model/Task.js";
import { asyncHandler } from "../middleware/asyncMiddleWare.js";

export default class TaskController {
    static getAllTask = asyncHandler(async (req, res) => {

        const tasks = await Task.getAllTask();

        if (!tasks) {
            res.status(404).json({
                message: "Taks não encontadas ou não há Tasks"
            })
        }

        res.status(200).json({
            tasks
        });
    })
}


