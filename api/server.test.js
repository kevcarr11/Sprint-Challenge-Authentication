const supertest = require("supertest")
const server = require("./server")


describe("register users route", () => {
  
  test("register bevis", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "Bevis", password: "password" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.saved.username).toMatch(/bevis/i)
  })

  test("register butthead", async () => {
    const res = await supertest(server)
      .post("/api/auth/register")
      .send({ username: "butthead", password: "password" })
    expect(res.status).toBe(201)
    expect(res.type).toBe("application/json")
    expect(res.body.saved.username).toMatch(/butthead/i)
  })
})

describe("login users route", () => {
  test("login bevis", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "Bevis", password: "password" })
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
    expect(res.body.token)
  })

  test("fail login", async () => {
    const res = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "jarvis", password: "password" })
    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.message).toBe("Invalid Credentials - Please try again")
  })
})

describe("jokes route", () => {

  test("invalid request", async () =>{
    const res = await supertest(server).get("/api/jokes")
    expect(res.status).toBe(401)
    expect(res.type).toBe("application/json")
    expect(res.body.you).toBe("shall not pass!")
  })

  test("valid request", async () =>{
    const userLogin = await supertest(server)
      .post("/api/auth/login")
      .send({ username: "Bevis", password: "password" })
    const token = userLogin.body.token 
    const res = await supertest(server).get("/api/jokes")
      .set("Authorization", token) 
    expect(res.status).toBe(200)
    expect(res.type).toBe("application/json")
  })
})
