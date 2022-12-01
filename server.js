const { createPool } = require("mysql");
const database = createPool({
  host: "localhost",
  user: "root",
  password: "Wermacht1945",
});

const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const app = express();
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(express.static("create"));

app.post("/bars", (request, response) => {
  const title = request.body.title;
  database.query(
    `select * from mydb.bar where title="${title}"`,
    (err, result) => {
      if (result.length === 0) {
        database.query(
          `insert into mydb.bar(title,description,color,font) values ("${title}","${request.body.description}","${request.body.color}",${request.body.font})`,
          (err) => {
            console.log(err);
          }
        );
        response.sendStatus(200);
      } else {
        console.log(result);
        response.sendStatus(400);
      }
    }
  );
});

app.put("/bars", (request, response) => {
  const title = request.body.title;
  database.query(
    `select * from mydb.bar where title="${title}"`,
    (err, result) => {
      if (result.length !== 0) {
        if (request.body.description !== "") {
          database.query(
            `update mydb.bar set description="${request.body.description}" where title="${title}"; `
          );
        }
        if (request.body.font !== "") {
          database.query(
            `update mydb.bar set font="${request.body.font}" where title="${title}"; `
          );
        }
        if (request.body.color !== "") {
          database.query(
            `update mydb.bar set color="${request.body.color}" where title="${title}"; `
          );
        }
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    }
  );
});

app.delete("/bars", (request, response) => {
  const title = request.body.title;
  database.query(
    `select * from mydb.bar where title="${title}"`,
    (err, result) => {
      if (result.length !== 0) {
        database.query(`delete from mydb.bar where title="${title}"`);
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    }
  );
});

app.get("/bars", (request, response) => {
  database.query(`select * from mydb.bar`, (err, result) => {
    response.json({ result: result });
  });
});
app.listen(3001);
