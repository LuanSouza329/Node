const request = require("supertest");
const app = require("../index");

describe("Autenticação", () => {
  it("Deve retornar um token válido ao fazer login", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "maria@email.com", password: "123456" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });

  it("Deve falhar com credenciais inválidas", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "naoexiste@email.com", password: "senhaErrada" });

    expect(res.statusCode).toBe(401);
  });
});
