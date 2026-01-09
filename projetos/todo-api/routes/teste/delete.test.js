import request from "supertest";
import { describe, expect, it, jest, test } from "@jest/globals";

let app;
let Task;

jest.unstable_mockModule("../../model/Task.js", () => ({
    default: {
        deleteTask: jest.fn()
    }
}));

beforeEach(async () => {
    Task = (await import("../../model/Task.js")).default;
    app = (await import("../../app.js")).default;
});

describe("Delete /api/delete/:id", () => {
    it("200 delete a task", async () => {

        Task.deleteTask.mockResolvedValue({
            message: "Task deletada com sucesso"
        });

        const res = await request(app)
            .delete("/api/task/delete/1")
            .expect("Content-Type", /json/);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("Task deletada com sucesso");
        expect(res.body).toHaveProperty("message");
    });

    test("400 Bad Request", async () => {

        const res = await request(app)
            .delete("/api/task/delete/a00**2bc")
            .expect("Content-Type", /json/);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("O ID deve ser um número inteiro");
    });

    test("404 task does not exist or not found", async () => {

        Task.deleteTask.mockResolvedValueOnce(null);

        const res = await request(app)
            .delete("/api/task/delete/1000")
            .expect("Content-Type", /json/);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe("Erro ao deletar Task ou Task não encontrada");
    });
});