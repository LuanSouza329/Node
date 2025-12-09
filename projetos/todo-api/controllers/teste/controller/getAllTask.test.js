import { beforeEach, describe, expect, jest, test } from "@jest/globals";
import request from "supertest";

let Task;
let app;

// MOCK DO BANCO (fundamental)
jest.unstable_mockModule("../../../config/database.js", () => ({
    default: {
        connect: jest.fn().mockResolvedValue()
    }
}));

// MOCK DO MODEL
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

describe("GET /task", () => {
    test("Returns all tasks", async () => {
        Task.getAllTask.mockResolvedValueOnce([
            { id: 1, titulo: "Teste", descricao: "Desc" }
        ]);

        const res = await request(app).get("/api/task")
            .expect('Content-Type', /json/)

        expect(res.statusCode).toBe(200);
        expect(res.body.tasks[0]).toHaveProperty("id");
        expect(res.body.tasks[0]).toHaveProperty("titulo");
        expect(res.body.tasks[0]).toHaveProperty("descricao");

    });

    test("Returns erro 404 when do not find a task", async () => {

        Task.getAllTask.mockResolvedValueOnce(null);

        const res = await request(app).get("/api/task")
            .expect('Content-Type', /json/)


        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Tasks não encontrada");
    });

    test("Returns 500 if there is an error", async () => {
        Task.getAllTask.mockRejectedValueOnce(new Error("Erro interno"));

        const res = await request(app).get("/api/task")
            .expect('Content-Type', /json/)


        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Erro interno do servidor");
    });

});
