import { beforeEach, describe, jest, test } from "@jest/globals";

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

describe("Update Task", () => {

    const id = 1;
    const titulo = "Tarefa teste";
    const descricao = "Descrição teste";

    test("Atualização das Tasks", async () => {

        mockQuery.mockResolvedValueOnce([
            { affectedRows: 1 }
        ]);

        const result = await Task.updateTask(id, titulo, descricao);

        expect(mockQuery).toHaveBeenCalledWith(
            "UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?", [titulo, descricao, id]
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

    test("Retorna null se nenhuma Task é atualizada", async () => {
        mockQuery.mockResolvedValueOnce([
            { affectedRows: 0 }
        ]);

        const result = await Task.updateTask(id, titulo, descricao);

        expect(result).toBeNull();

    })

    /* Resultado em caso de erro de conexão */
    test("Lança um erro em caso de erro do conexão com DB", async () => {

        /* Resultado esperado */
        mockQuery.mockRejectedValueOnce(new Error("Erro de conexão"));

        /* Ação do código */
        await expect(Task.updateTask(id, titulo, descricao)).rejects.toThrow("Erro de conexão");

        expect(mockQuery).toHaveBeenCalledWith("UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?", [titulo, descricao, id]);
    });
})
