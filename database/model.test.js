const usersModel = require("./model")
const db = require("../database/dbConfig")

beforeEach(async () => {
  await db.seed.run()
})

describe("model", () => {
  test("findById", async () => {
    const res = await usersModel.findById(1)
    expect(res.username).toMatch(/kevin/i)
  })

  test("add", async () => {
    await usersModel.add({ username: "Jerry", password: "abc123" })
    const users = await db("users").select()
    expect(users.length).toBe(4)
  })

  test("find", async () => {
    const res = await usersModel.find()
    expect(res.length).toBeGreaterThan(0)
  })

  test("findBy", async () => {
    const user = { username: "Kevin", password: "abc123" } 
    const res = await usersModel.findBy(user)
    expect(res.username).toMatch(/kevin/i)
    
  })

})
