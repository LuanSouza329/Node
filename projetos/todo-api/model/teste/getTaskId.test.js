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


describe("Get Task by ID", () => {

    const id = 1;

    test("Retorna uma Task pelo seu ID", async () => {

        mockQuery.mockResolvedValueOnce([
            [
                { id: 1, titulo: "Tarefa teste", descricao: "Descrição teste" }
            ]
        ]);

        const result = await Task.getTask(id);

        expect(mockQuery).toHaveBeenCalledWith(
            "SELECT * FROM tarefas WHERE id = ?",
            [id]
        );

        expect(result).toEqual({
            id: 1,
            titulo: "Tarefa teste",
            descricao: "Descrição teste"
        });

        expect(result).toHaveProperty("id");
        expect(result).toHaveProperty("titulo");
        expect(result).toHaveProperty("descricao");
    });

    test("Lança um erro em caso de erro do conexão com DB", async () => {

        /* Resultado esperado */
        mockQuery.mockRejectedValueOnce(new Error("Erro de conexão"));

        /* Ação do código */
        await expect(Task.getTask(id)).rejects.toThrow("Erro de conexão");

        expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tarefas WHERE id = ?", [id]);
    });

    /* Resultado quando o banco está vazio */
    test("Retorna undefined quando o ID não existe", async () => {
        mockQuery.mockResolvedValueOnce([[]]); 

        const result = await Task.getTask(id);

        expect(mockQuery).toHaveBeenCalledWith(
            "SELECT * FROM tarefas WHERE id = ?",
            [id]
        );

        expect(result).toBeUndefined();
    });

});
