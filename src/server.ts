import express from "express";
import jwt from "jsonwebtoken";
import { routesPost } from "./routes/routes-posts";
import { routesUser } from "./routes/routes-user";
import { Database } from "sqlite3";
import { compareHash } from "./crypt";
import "dotenv/config";

const app = express();
const port = 80;
const router = express.Router();
app.use(express.json()); // to support JSON-encoded bodies
app.use("/users", routesUser);
app.use("/posts", routesPost);

const db = new Database("database.db");

router.post("/login", function (req, res) {
  const { email, password } = req.body;

  let sql = `SELECT * FROM user WHERE email=?`;
  db.all(sql, [email], async (_, query) => {
    if (query.length > 0) {
      if (await compareHash(password, query[0].password)) {
        const user = {id: query[0].id, email: query[0].email}
        jwt.sign(user, String(process.env.SECRET_KEY), {expiresIn: '2m'}, (err: any, token: any) => {
          res.json({
            token
          });
        });
      } else {
        res.send({ message: `Incorrect password` });
      }
    } else {
      res.send({ message: `There is no user with the email entered` });
    }
  });
});

// router.post("/api", async function (req, res) {
//   const { id } = req.body;

//   let response = await fetch(
//     `https://jsonplaceholder.typicode.com/todos/${id}`
//   );
//   let data = await response.json();
//   console.log(data);
//   res.send(data);
// });

// router.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname + "./index.html"));
//   //__dirname : It will resolve to your project folder.
// });

// router.get("/api", (req, res) => {
//   //res.json({ username: 'Flavio' })
//   res.send({ username: "Fio Conera" });
// });

//add the router
app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
