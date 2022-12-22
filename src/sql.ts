import { Database } from 'sqlite3';
const db = new Database("database.db");
let sql;


sql = `CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);
`
db.run(sql);

sql = `CREATE TABLE IF NOT EXISTS post (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  idAutor TEXT NOT NULL
);`
db.run(sql);

db.close()