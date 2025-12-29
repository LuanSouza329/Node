import request from "supertest";
import { describe, expect, jest, test } from "@jest/globals";

let app;
let Task;

jest.unstable_mockModule("../../model/Task.js", () => ({
    default: {
        updateTask: jest.fn()
    }
}));

beforeEach(async () => {
    Task = (await import("../../model/Task.js")).default;
    app = (await import("../../app.js")).default;
});


describe("PUT/api/task/update/:id", () => {
    test("200 Task updated", async () => {

        Task.updateTask.mockResolvedValueOnce({
            id: 1,
            titulo: "Novo Teste",
            descricao: "Nova Desc"
        });

        const res = await request(app)
            .put("/api/task/update/1")
            .send({ titulo: "Teste", descricao: "Desc" });

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task atualizada com sucesso");
    });

    test("404 Bad Request", async () => {
        
        const res = await request(app)
            .put("/api/task/update/abc")
            .send({ titulo: "Teste", descricao: "Desc" });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("O ID deve ser um número inteiro");
    });
})