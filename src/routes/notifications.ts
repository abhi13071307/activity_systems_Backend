import { Router, Request, Response } from "express";
import { notificationHub } from "../services/notificationHub";
import { db } from "../db";

const router = Router();

router.get("/stream", (req: Request, res: Response) => {
  const userId = Number(req.query.user_id);
  if (!userId) {
    return res.status(400).end();
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // initial ping
  res.write(`event: connected\ndata: {}\n\n`);

  notificationHub.addClient(userId, res);

  req.on("close", () => {
    notificationHub.removeClient(userId, res);
  });
});

router.get("/", (req, res) => {
  const userId = Number(req.query.user_id);
  const since = Number(req.query.since) || 0;

  if (!userId) {
    return res.status(400).json({ error: "user_id required" });
  }

  db.all(
    `
    SELECT event_id, created_at
    FROM notifications
    WHERE user_id = ? AND created_at > ?
    ORDER BY created_at DESC
    LIMIT 50
    `,
    [userId, since],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ notifications: rows });
    }
  );
});

export default router;
