const request = require("supertest");
const app = require("../index"); // exporte o app no index.js

describe("Servidor Express", () => {
  it("Deve responder na rota /users com status 200", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
  });
});
