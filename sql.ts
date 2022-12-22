import { Database } from 'sqlite3';
const db = new Database('test.db');

db.all(
  'SELECT * FROM user',
  (_, res) => console.log(res)
);