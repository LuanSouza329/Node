import request from "supertest";
import { jest } from "@jest/globals";

let app;
let Task;

jest.unstable_mockModule("../../model/Task.js", () => ({
    default: {
        createTask: jest.fn()
    }
}));

beforeEach(async () => {
    Task = (await import("../../model/Task.js")).default;
    app = (await import("../../app.js")).default;
});

describe("POST /api/task/create", () => {

    test("201 - cria task", async () => {
        Task.createTask.mockResolvedValueOnce({
            id: 1,
            titulo: "Teste",
            descricao: "Desc"
        });

        const res = await request(app)
            .post("/api/task/create")
            .send({ titulo: "Teste", descricao: "Desc" });

        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Task criada com sucesso");
        expect(res.body.tasks).toHaveProperty("id");
    });

    test("400 - título ausente", async () => {
        const res = await request(app)
            .post("/api/task/create")
            .send({ descricao: "Desc" });

        expect(res.statusCode).toBe(400);
    });


    test("400 - campos obrigatórios", async () => {
        const res = await request(app)
            .post("/api/task/create")
            .send({ titulo: "" });

        expect(res.statusCode).toBe(400);
    });

});

