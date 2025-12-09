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


describe("UPDATE/TASK/:id", () => {
    test("Returns a task updated", async () => {
        Task.updateTask.mockResolvedValueOnce({
            id: 1,
            titulo: "Teste",
            descricao: "Desc"
        });

        const res = await request(app)
            .put("/api/task/update/1")
            .send({ titulo: "Teste", descricao: "Desc" })
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task atualizada com sucesso");
        expect(res.body.task).toHaveProperty("id");
        expect(res.body.task).toHaveProperty("titulo");
        expect(res.body.task).toHaveProperty("descricao");
    });


    test("Returns 404 if there is no matching task", async () => {
        Task.getTask.mockResolvedValueOnce(null);

        const res = await request(app)
            .put("/api/task/update/1")
            .send({ titulo: "Teste", descricao: "Desc" })
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Task não encontrada ou não existente");
    });

    test("Returns 500 when there is a model error", async () => {
        Task.updateTask.mockRejectedValueOnce(new Error("Erro interno"));

        const res = await request(app)
            .put("/api/task/update/1")
            .send({
                titulo: "Teste",
                descricao: "Desc"
            })
            .expect('Content-Type', /json/);

        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Erro interno do servidor");
    });
})