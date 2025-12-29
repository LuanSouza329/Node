import request from "supertest";
import { describe, expect, jest, test } from "@jest/globals";

let app;
let Task;

jest.unstable_mockModule("../../model/Task.js", () => ({
    default: {
        getTask: jest.fn()
    }
}));

beforeEach(async () => {
    Task = (await import("../../model/Task.js")).default;
    app = (await import("../../app.js")).default;
});

describe("Get api/task/search/:id", () => {
    test("200 return a task by its id", async () => {

        Task.getTask.mockResolvedValueOnce({
            id: 1,
            titulo: "Novo Teste",
            descricao: "Nova Desc"
        });

        const res = await request(app)
            .get("/api/task/search/1")
            .expect("Content-Type", /json/);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("titulo");
        expect(res.body).toHaveProperty("descricao");
        expect(res.ok).toBe(true);
    });

    test("400 Bad Request", async () => {

        const res = await request(app)
            .get("/api/task/search/abc")
            .expect("Content-Type", /json/);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("O ID deve ser um número inteiro");
    });
})
