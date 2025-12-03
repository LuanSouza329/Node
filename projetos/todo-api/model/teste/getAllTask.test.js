import { beforeEach, describe, jest, test } from "@jest/globals";

let Task;
let db;
let mockQuery;

// 1. Mock assíncrono do módulo
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

describe("Task getAllTask", () => {
  /* Resultado esperado */
  test("Retorna todas as tasks", async () => {
    // arrange -- Retorno esperado do teste
    mockQuery.mockResolvedValueOnce([
      [
        { id: 1, titulo: "Tarefa teste", descricao: "Descrição teste" }
      ]
    ]);

    // act - A ação do teste
    const result = await Task.getAllTask();

    // assert - teste da query
    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tarefas");

    expect(result).toEqual([ //resultado da query
      { id: 1, titulo: "Tarefa teste", descricao: "Descrição teste" }
    ]);


    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("titulo");
    expect(result[0]).toHaveProperty("descricao");
  });

/* Resultado quando o banco está vazio */
  test("Retorna um array vazio", async () => {
    mockQuery.mockResolvedValueOnce([[], []]);

    const result = await Task.getAllTask();

    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tarefas");

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  /* Resultado em caso de erro de conexão */
  test("Lança um erro em caso de erro do conexão com DB", async () => {

    /* Resultado esperado */
    mockQuery.mockRejectedValueOnce(new Error("Erro de conexão"));

    /* Ação do código */
    await expect(Task.getAllTask()).rejects.toThrow("Erro de conexão");

    expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM tarefas");
  });
});

