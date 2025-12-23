import expect from "expect";
import PessoaController from "./PessoaController.js";
import { describe, test, jest } from "@jest/globals";


describe("Teste de métodos de umas class", () => {

    test("A pessoa vai falar oi", () => {

        const pessoa = new PessoaController();

        pessoa.falar = jest.fn().mockResolvedValue({nome: "Luan"});


        const resultado = pessoa.falar();

        console.log(resultado);

        expect(resultado).toBe("Luan");
    });
})