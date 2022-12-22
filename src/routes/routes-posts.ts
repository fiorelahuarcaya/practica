import express from "express";

export const routesPost = express.Router();
import { Database } from "sqlite3";
const db = new Database("database.db");


routesPost.get("/", (req, res) => {
    let sql = `SELECT * FROM post`;
    db.all(sql, (_, query) => res.send(query));
  });
  
  routesPost.post("/", (req, res) => {
    const { title, body,idAutor } = req.body;
  
    let sql = `INSERT INTO post (title, body,idAutor) VALUES (?,?,?)`;
    db.run(sql, [title, body,idAutor], (err) => {
      if (err) res.send(err.message);
      else res.send({ message: `Post saved` });
    });
  });
  
  routesPost.put("/:id", (req, res) => {
    let id = req.params.id;
    const { title, body,idAutor } = req.body;

    const statement = db.prepare(
      `UPDATE post SET title=? , body=? , idAutor=? WHERE id=?`
    );
  
    statement.run([title, body,idAutor, id], (err) => {
      if (err) res.send(err.message);
      else res.send({ message: `Post updated` });
    });
  });
  
  routesPost.delete("/:id", async function (req, res) {
    let id = req.params.id;
  
    const delete_statement = db.prepare(`DELETE FROM post WHERE id=?`);
    delete_statement.run([id], (err) => {
      if (err) res.send(err.message);
      else res.send({ message: `Post deleted` });
    });
  });
  