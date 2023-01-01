import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

export const routesPost = express.Router();
import { Database } from "sqlite3";
const db = new Database("database.db");




routesPost.get("/", verifyToken ,(req, res) => {
  
  jwt.verify(String(req.headers.authorization), String(process.env.SECRET_KEY),(err: any, token: any) => {
    if(err){
      res.sendStatus(403);
    }else{
      let sql = `SELECT * FROM post`;
      db.all(sql, (_, query) => res.send(query));
    }
  }) 
});

routesPost.get("/:id", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT * FROM post WHERE id=?`;
  db.all(sql,[id],(_, query) => res.send(query));
});


routesPost.post("/", (req, res) => {
  const { title, body, idAutor } = req.body;

  let sql = `INSERT INTO post (title, body,idAutor) VALUES (?,?,?)`;
  db.run(sql, [title, body, idAutor], (err) => {
    if (err) res.send(err.message);
    else res.send({ message: `Post saved` });
  });
});

routesPost.put("/:id", (req, res) => {
  let id = req.params.id;
  const { title, body, idAutor } = req.body;

  const statement = db.prepare(
    `UPDATE post SET title=? , body=? , idAutor=? WHERE id=?`
  );

  statement.run([title, body, idAutor, id], (err) => {
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

//Authorization: Bearer <token>
function verifyToken(req: any, res: any, next: any){
  const bearerHeader = req.headers['authorization'];

  if(typeof bearerHeader != 'undefined'){
    const bearerToken = bearerHeader.split(" ")[1];
    req.headers.authorization = bearerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}