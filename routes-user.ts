import express from "express";
export const routesUser = express.Router();
import { Database } from "sqlite3";
const db = new Database("test.db");

routesUser.get("/", (req, res) => {
  let sql = `SELECT * FROM user`;
  db.all(sql, (_, query) => res.send(query));
});

routesUser.post("/", (req, res) => {
  const { name, lastName } = req.body;

  let sql = `INSERT INTO user (name, lastName) VALUES (?,?)`;
  db.run(sql, [name, lastName], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `Usuario Guardado` });
  });
});

routesUser.put("/:id", (req, res) => {
  let id = req.params.id;
  const { name, lastName } = req.body;
  const statement = db.prepare(
    `UPDATE user SET name=? , lastname=? WHERE id=?`
  );

  statement.run([name, lastName, id], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `Usuario Actualizado` });
  });
});

routesUser.delete("/:id", async function (req, res) {
  let id = req.params.id;

  const delete_statement = db.prepare(`DELETE FROM user WHERE id=?`);
  delete_statement.run([id], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `Usuario Eliminado` });
  });
});
