import { beforeEach, describe, expect, jest, test } from "@jest/globals";

let Task;
let db;
let mockQuery;

jest.unstable_mockModule("../../config/database.js", () => ({
    default: {
        getConnection: jest.fn()
    }
}));

beforeEach(async () => {
    // 2. Importar após o mock estar pronto
    db = (await import("../../config/database.js")).default;
    Task = (await import("../Task.js")).default;

    mockQuery = jest.fn();

    db.getConnection.mockReturnValue({
        query: mockQuery
    });
});

describe("Task CreateTask", () => {
    /* Resultado esperado */
    const id = 1;
    const titulo = "Tarefa teste";
    const descricao = "Descrição teste";

    test("Cria uma task com sucesso", async () => {
        // arrange
        mockQuery.mockResolvedValueOnce([
            { insertId: 1 } // retorno típico de um INSERT no MySQL
        ]);

        // act
        const result = await Task.createTask(titulo, descricao);

        // assert
        expect(mockQuery).toHaveBeenCalledWith(
            "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)",
            [titulo, descricao]
        );

        expect(result).toEqual({
            id: 1,
            titulo,
            descricao
        });

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("titulo");
        expect(result).toHaveProperty("descricao");
    });

    test("Lança um erro quando o banco falha", async () => {

        mockQuery.mockRejectedValueOnce(new Error("Erro no banco"));

        await expect(Task.createTask("Teste", "Descrição"))
            .rejects
            .toThrow("Erro no banco");
    });

    test("Lança um erro em caso de erro do conexão com DB", async () => {

        /* Resultado esperado */
        mockQuery.mockRejectedValueOnce(new Error("Erro de conexão"));

        /* Ação do código */
        await expect(Task.createTask(titulo, descricao)).rejects.toThrow("Erro de conexão");

        expect(mockQuery).toHaveBeenCalledWith("INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)",
            [titulo, descricao]);
    });
});
