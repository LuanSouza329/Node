import request from "supertest";
import { jest } from "@jest/globals";

let app;
let Task;

jest.unstable_mockModule("../../model/Task.js", () => ({
    default: {
        getAllTask: jest.fn()
    }
}));

beforeEach(async () => {
    Task = (await import("../../model/Task.js")).default;
    app = (await import("../../app.js")).default;
});

describe("GET /api/task", () => {
    test("Return all task", async () => {
        Task.getAllTask.mockResolvedValueOnce([
            { id: 1, titulo: "Teste", descricao: "Desc" }
        ]);

        const res = await request(app)
            .get("/api/task")
            .expect("Content-Type", /json/);

        expect(res.statusCode).toBe(200);
        expect(res.body.tasks).toHaveLength(1);
        expect(res.body.tasks[0]).toHaveProperty("id");
        expect(res.body.tasks[0]).toHaveProperty("titulo");
        expect(res.body.tasks[0]).toHaveProperty("descricao");
    });

    test("Return 404 if there is no task", async () => {
        Task.getAllTask.mockResolvedValueOnce(null);

        const res = await request(app).get("/api/task");

        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Tasks não encontrada");
    });


    test("500 - erro inesperado", async () => {
        Task.getAllTask.mockImplementation(() => {
            throw new Error("Erro interno");
        });

        const res = await request(app).get("/api/task");

        expect(res.statusCode).toBe(500);
    });
});
