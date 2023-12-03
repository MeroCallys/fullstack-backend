// import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import Chance from "chance";

const postgres = {
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1023",
  port: 5432,
};

const db = new pg.Client({
  user: postgres.user,
  host: postgres.host,
  database: postgres.database,
  password: postgres.password,
  port: postgres.port,
});

const app = express();
const port = 3000;
const chance = new Chance();
db.connect();

let dbData;

console.log(typeof chance.name());

db.query("SELECT * FROM profiles", (err, res) => {
  if (err) console.log("Error executing query", err.stack);
  else dbData = res.rows;
  db.end();
});

// for (let i = 0; i < 1; i++) {
//   db.query(
//     `INSERT INTO profiles(id, category,company,first_name,last_name,street,city,postal_code,province,country,phone,email,created_on)
//     VALUES (
//       $1,
//       $2,
//       $3,
//       $4,
//       $5,
//       $6,
//       $7,
//       $8,
//       $9,
//       $10,
//       $11,
//       $12,
//       $13
//     ) `,
//     [
//       "DEFAULT",
//       "walk-in",
//       "walk-in",
//       `${chance.first()}`,
//       `${chance.last()}`,
//       `${chance.street()}`,
//       `${chance.city()}`,
//       `${chance.postcode()}`,
//       `${chance.province()}`,
//       `${chance.country()}`,
//       `${chance.phone()}`,
//       `${chance.email()}`,
//       "LOCALTIMESTAMP",
//     ],
//     (err, res) => {
//       if (err) console.log("Error executing query", err.stack);
//       else dbData = res.rows;
//       db.end();
//     }
//   );
// }

// app.use(cors);

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/profiles", (req, res) => {
  res.json(dbData);
  console.log(dbData);
});

app.listen(port, () => {
  console.log(`Server is up and running at  http://localhost:${port}`);
});
