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

describe("Create a Task", () => {
    test("Create a task", async () => {

        Task.createTask.mockResolvedValueOnce({
            id: 1,
            titulo: "Teste",
            descricao: "Desc"
        });

        const res = await request(app)
            .post("/api/task/create")
            .send({ titulo: "Teste", descricao: "Desc" })
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("Task criada com sucesso");
        expect(res.body.tasks).toHaveProperty("id");
        expect(res.body.tasks).toHaveProperty("titulo");
        expect(res.body.tasks).toHaveProperty("descricao");
    });

    test("Returns 500 if there is a model error ", async () => {
        Task.createTask.mockRejectedValueOnce(new Error("Erro interno"));

        const res = await request(app)
            .post("/api/task/create")
            .send({
                titulo: "Teste",
                descricao: "Desc"
            })
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(500);
        expect(res.body.message).toBe("Erro interno do servidor");
    });

    test("Returns an error 400 when missing requested fields", async () => {
        const res = await request(app)
            .post("/api/task/create")
            .send({
                titulo: "",
                descricao: ""
            })
            .expect('Content-Type', /json/);


        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Titulo é um campo obrigatório, O tamanho mínimo do campo título é 3, Descricao é um campo obrigatório, O tamanho mínimo do campo descricao é 3");
    });



})