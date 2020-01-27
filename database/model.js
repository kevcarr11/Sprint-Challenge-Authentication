const bcrypt = require("bcryptjs")
const db = require('../database/dbConfig')

module.exports = {
  add,
  find,
  findBy,
  findById,
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14)
  const [id] = await db("users").insert(user)
    return findById(id)
}

function find() {
  return db("users")
    .select()
}

function findBy(filter) {
  return db("users")
    .where(filter)
    .select()
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
}
