import { describe } from "@jest/globals";
import expect from "expect";
function sum(a, b) {
    return a + b;
}

const teste = ()=>{
    return "Ola";
}


describe("Tets", () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(2,3)).toBeGreaterThan(3);
    });

    test("Retorna uma string", ()=>{
        expect(teste()).toBe("Ola");
        expect(teste()).toHaveLength(3);
    })
})