const sqlite3 = require('sqlite3').verbose();
let sql;

//connect to DB
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err)=>{
  if(err) return console.error(err.message)
});

sql = `CREATE TABLE IF NOT EXISTS user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL
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


// sql = `INSERT INTO user (name, lastName) VALUES (?,?)`;
// db.run(sql, ["Fiorela", "Huarcaya"],  (err)=>{
//   if(err) return console.error(err.message)
// })

// sql=`SELECT * FROM user`;
// db.all(sql,[], (err, rows) =>{
//   if(err) return console.error(err.message)
//   rows.forEach((row)=>{
//     console.log(row);
//   })
// }
// );

