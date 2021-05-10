import { Router } from "express";
import heartbeat from "./heartbeat";

export default Router().get("/heartbeat", heartbeat);
