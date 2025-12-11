import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import request from "supertest";

let Task;
let app;

jest.unstable_mockModule("../../../config/database.js", () => ({
    default: {
        connect: jest.fn().mockResolvedValue()
    }
}));

jest.unstable_mockModule("../../../model/Task.js", () => ({
    default: {
        getAllTask: jest.fn(),
        getTask: jest.fn(),
        createTask: jest.fn(),
        updateTask: jest.fn(),
        deleteTask: jest.fn()
    }
}));

beforeEach(async () => {
    Task = (await import("../../../model/Task.js")).default;
    app = (await import("../../../app.js")).default;
});

describe("TASK / DELETE", () => {
    test("Delete a task successfully", async () => {
        Task.deleteTask.mockResolvedValue({
            message: "Task deletada com sucesso"
        });

        const res = await request(app)
            .delete("/api/task/delete/1")
            .expect('Content-Type', /json/);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task deletada com sucesso");
        expect(res.body).toHaveProperty("message");
    })

    test("Returns 404 if there is no matching task", async () => {
        Task.deleteTask.mockResolvedValue(null)

        const res = await request(app)
            .delete("/api/task/delete/999")
            .expect("Content-Type", /json/);

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Erro ao deletar Task ou Task não encontrada");
    });

    test("Returns 500 when there is a model error", async () => {

        Task.deleteTask.mockRejectedValue(
            new Error("Erro interno do servidor")
        );

        const res = await request(app)
            .delete("/api/task/delete/1")
            .expect("Content-Type", /json/);

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Erro interno do servidor");
    });

})

