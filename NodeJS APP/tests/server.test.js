const request = require("supertest");
const app = require("../server");


describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/id");
        expect(response.statusCode).toBe(200);
    });
});

describe("Test the user path", () => {
    test("It should response the GET method", async () => {
        const response = await request(app).get("/user");
        expect(response.statusCode).toBe(200);
    });
});

describe("Test the root path", () => {
    test("It should response the GET method", async () => {
        const user = {
            "firstName": "Super",
            "lastName": "Man",
            "email": "superman@dc.com",
            "tone": "Iconic"
        }
        const response = await request(app).post("/user").send(user);
        expect(response.data).toEqual('CREATE ENTRY SUCCESSFUL')
    });
});