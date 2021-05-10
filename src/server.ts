import express from "express";
import helmet from "helmet";
import api from "./api";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(helmet());
app.use(cors());

const PORT = 31000;

app.use("/", api);
// app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(PORT, () => console.log(`server started at ${PORT}`));
