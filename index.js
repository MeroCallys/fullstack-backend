import cors from "cors";
import express from "express";
import pg from "pg";

const postgres = {
  user: "postgres",
  host: "localhost",
  database: "test",
  password: "1023",
  port: 5432,
};

const pool = new pg.Pool(postgres);

// initialize
const app = express();
const port = 3000;

// pool connection
await pool.connect();

// notification
pool.on("error", (err) => {
  console.error("something bad has happened!", err.stack);
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ids", async (req, res) => {
  const result = await pool.query("SELECT id FROM profiles");
  res.json(result.rows);
});
app.get("/ids", async (req, res) => {
  const result = await pool.query("SELECT id FROM profiles");
  res.json(result.rows);
});

app.get("/fullnames", async (req, res) => {
  const result = await pool.query(
    "SELECT first_name as firstName, last_name as lastName FROM profiles"
  );
  res.json(result.rows);
});

app.get("/profiles", async (req, res) => {
  const result = await pool.query("SELECT * FROM profiles");
  res.send(result.rows);
});

app.post("/add-profile", async (req, res) => {
  const input = Object.values(req.body);
  await pool.query(
    `INSERT INTO profiles (id, category, company, first_name, last_name, street, city, postal_code, province, country, phone, email, created_on)
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)`,
    input
    // [
    //   "Dealership",
    //   "GMC Wolfe",
    //   "Rose",
    //   "Seign",
    //   "793 Tamarack Way",
    //   "Edmonton",
    //   "T6T 2M4",
    //   "Alberta",
    //   "Canada",
    //   "780-265-6949",
    //   "lhey123@gmail.com",
    // ]
  );
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
