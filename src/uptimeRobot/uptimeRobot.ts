import { Router, Request, Response } from "express";
import config from "../config";
import request from "request";

enum Status {
  Paused = 0,
  NotCheckedYet = 1,
  Up = 2,
  SeemsDown = 8,
  Down = 9,
}

const options = {
  method: "POST",
  url: "https://api.uptimerobot.com/v2/getMonitors",
  headers: {
    "cache-control": "no-cache",
    "content-type": "application/json",
  },
  form: { api_key: config().uptimeRobotReadonlyKey, format: "json" },
};

interface StatusResponse {
  name: string;
  status: Status;
}

interface UptimeRobotResponse {
  friendly_name: string;
  status: number;
}

export default Router().get(
  "/stats",
  async (req: Request, res: Response<StatusResponse[]>): Promise<void> => {
    try {
      const body = await getUptemeRobotMonitors();
      res.send(
        body.map((m) => ({
          name: m.friendly_name,
          status: m.status,
        }))
      );
    } catch (e) {
      res.sendStatus(503);
    }
  }
);

const getUptemeRobotMonitors = async (): Promise<UptimeRobotResponse[]> => {
  return new Promise((res, rej) => {
    request(options, (error, response, body) => {
      if (error) {
        rej(error);
      }
      res(JSON.parse(body).monitors);
    });
  });
};
