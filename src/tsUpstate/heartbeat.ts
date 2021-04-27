import { Router, Request, Response } from "express";
import net from "net";

export default Router().get(
  "/heartbeat",
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.send(await checkTeamspeakViaTelnet());
    } catch (e) {
      res.sendStatus(503);
    }
  }
);

const checkTeamspeakViaTelnet = (): Promise<string> => {
  const sock = new net.Socket();
  sock.setTimeout(2500);
  return new Promise((res, rej) => {
    sock
      .on("connect", () => {
        res("teamspeak is up");
        sock.destroy();
      })
      .on("error", () => {
        sock.destroy();
        rej("Teamspeak is down");
      })
      .on("timeout", () => {
        sock.destroy();
        rej("Teamspeak is down");
      })
      .connect(10011, "localhost");
  });
};
