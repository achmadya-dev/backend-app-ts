import supertest from "supertest";
import web from "../middleware";
import prisma from "../utils/client";

describe("User", () => {
    const name = Math.random().toString(36).substring(7);
    const email = `${Math.random().toString(36).substring(7)}@example.com`;
    const password = "password";
    const confirmPassword = "password";

    it("user create success", async () => {
        const response = await supertest(web).post("/api/register").send({
            name: name,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        });
        expect(response.status).toBe(201);
    });

    it("user login success", async () => {
        const response = await supertest(web).post("/api/login").send({
            email: email,
            password: password
        });
        expect(response.status).toBe(200);
    });

    it("user login fail", async () => {
        const response = await supertest(web).post("/api/login").send({
            email: email,
            password: "password1"
        });
        expect(response.status).toBe(401);
    });

    it("user login fail", async () => {
        const response = await supertest(web).post("/api/login").send({
            email: "wrong@example.com",
            password: "password"
        });

        expect(response.status).toBe(401);
    });

    afterAll(async () => {
        await prisma.user.deleteMany({
            where: {
                email: email
            }
        });
    });
});
