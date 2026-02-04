import { Router } from "express";
import {
  analytics1m,
  analytics5m,
  analytics1h
} from "../services/analyticsWindow";

const router = Router();

router.get("/", (req, res) => {
  const window = req.query.window as string;

  let data;
  switch (window) {
    case "1m":
      data = analytics1m.top();
      break;
    case "5m":
      data = analytics5m.top();
      break;
    case "1h":
      data = analytics1h.top();
      break;
    default:
      return res.status(400).json({
        error: "Invalid window. Use 1m | 5m | 1h"
      });
  }

  res.json({ top: data });
});

export default router;
