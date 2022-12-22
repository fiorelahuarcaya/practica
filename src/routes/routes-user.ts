import express from "express";
export const routesUser = express.Router();
import { Database } from "sqlite3";
import bcrypt from "bcrypt";

import {createHash} from "../crypt";

const db = new Database("database.db");

routesUser.get("/", (req, res) => {
  let sql = `SELECT * FROM user`;
  db.all(sql, (_, query) => res.send(query));
});

routesUser.post("/", (req, res) => {
  const { email, password } = req.body;
  let hash = createHash(password);

  let sql = `INSERT INTO user (email, password) VALUES (?,?)`;
  db.run(sql, [email, hash], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `User saved` });
  });
});

routesUser.put("/:id", (req, res) => {
  let id = req.params.id;
  const { email, password } = req.body;

  let hash = createHash(password);

  const statement = db.prepare(
    `UPDATE user SET email=? , password=? WHERE id=?`
  );

  statement.run([email, hash, id], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `User updated` });
  });
});

routesUser.delete("/:id", async function (req, res) {
  let id = req.params.id;

  const delete_statement = db.prepare(`DELETE FROM user WHERE id=?`);
  delete_statement.run([id], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `User deleted` });
  });
});

