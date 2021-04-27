import express from "express";
import helmet from "helmet";
import api from "./api";
import cors from "cors";

const app = express();
app.use(helmet());
app.use(cors());

const PORT = 3000;

app.use("/", api);

app.listen(PORT, () => console.log(`server started at ${PORT}`));
