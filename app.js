import dotenv from "dotenv";
import express from "express";
import { connecMD } from "./src/mongodb_config.js";
import router from "./src/routes.js";
import cors from "cors";
import { asyncofultraadmin } from "./src/Schema.js";
import {ratelimiter} from "./src/ratelimit.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    // origin:["http://localhost:3001"]
    origin: "*",
  }),
);

async function handleasync() {
  await connecMD();

  const PORT = process.env.port;

  app.listen(PORT, () => {
    console.log("Server is live on port:", PORT);
  });

  asyncofultraadmin();
}

handleasync();

app.use(ratelimiter)

app.use("/", router);
