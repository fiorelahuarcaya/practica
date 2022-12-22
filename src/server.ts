import express from "express";
const app = express();
const port = 80;
import path from "path";
const router = express.Router();
import {routesPost} from "./routes/routes-posts";
import {routesUser} from "./routes/routes-user";

app.use(express.json()); // to support JSON-encoded bodies

app.use("/users", routesUser);
app.use("/posts", routesPost);


router.get("/api/:id", async function (req, res) {
  let id = req.params.id;
  let response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  let data = await response.json();
  console.log(data);
  res.send(data);
});

router.post("/api", async function (req, res) {
  const { id } = req.body;

  let response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  let data = await response.json();
  console.log(data);
  res.send(data);
});

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "./index.html"));
  //__dirname : It will resolve to your project folder.
});

router.get("/api", (req, res) => {
  //res.json({ username: 'Flavio' })
  res.send({ username: "Fio Conera" });
});

//add the router
app.use("/", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
