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

describe("GET /task/:id", () => {

    test("Retorna uma task pelo ID", async () => {
        Task.getTask.mockResolvedValueOnce([
            { id: 1, titulo: "Teste", descricao: "Desc" }
        ]);

        const res = await request(app).get("/api/task/search/1")
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0]).toHaveProperty("id");
        expect(res.body[0]).toHaveProperty("titulo");
        expect(res.body[0]).toHaveProperty("descricao");
    });

    test("Returns 404 when there is no task", async () => {
        Task.getTask.mockResolvedValueOnce(null);

        const res = await request(app).get("/api/task/search/999")
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Task não encontrada ou não existente");
    });

    test("Returns 500 if there is an error", async () => {
        Task.getTask.mockRejectedValueOnce(new Error("Erro interno"));

        const res = await request(app).get("/api/task/search/1")
            .expect('Content-Type', /json/)


        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Erro interno do servidor");
    });

});
