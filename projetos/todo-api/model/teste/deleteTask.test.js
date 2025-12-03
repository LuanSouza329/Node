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
    db = (await import("../../config/database.js")).default;
    Task = (await import("../Task.js")).default;

    mockQuery = jest.fn();

    db.getConnection.mockReturnValue({
        query: mockQuery
    });
});

describe("Delete a Task", () => {

    const id = 1;

    test("Deletes a task by ID", async () => {

        mockQuery.mockResolvedValueOnce([
            { affectedRows: 1 }
        ]);

        const result = await Task.deleteTask(id);

        expect(mockQuery).toHaveBeenCalledWith(
            "DELETE FROM tarefas WHERE id = ?",
            [id]
        );

        expect(result).toBe(true);
    });

    test(" DB conexion error ", async () => {

        /* Resultado esperado */
        mockQuery.mockRejectedValueOnce(new Error("Erro de conexão"));

        /* Ação do código */
        await expect(Task.deleteTask(id)).rejects.toThrow("Erro de conexão");

        expect(mockQuery).toHaveBeenCalledWith("DELETE FROM tarefas WHERE id = ?", [id]);
    });

    test("Returns null if there is no task", async () => {
        mockQuery.mockResolvedValueOnce([
            { affectedRows: 0 }
        ]);

        const result = await Task.deleteTask(id);

        expect(result).toBeNull();
    })
});