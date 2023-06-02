import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./database/conn.js";
import router from "./router/route.js";

// Initailizing express
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //Less hackers know about your stack

const port = 8080;

// HTTP GET REquest
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// API ENDPOINTS
app.use("/api", router);

// START SERVER ONLY WHEN WE HAVE VALID CONNECTIONS

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection");
  });
