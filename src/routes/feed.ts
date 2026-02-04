import { Router } from "express";
import { getFeed } from "../services/feedService";

const router = Router();

router.get("/", async (req, res) => {
  const userId = Number(req.query.user_id);
  const cursor = req.query.cursor as string | undefined;
  const limit = Number(req.query.limit) || 20;

  if (!userId) {
    return res.status(400).json({ error: "user_id is required" });
  }

  const feed = await getFeed(userId, cursor, limit);
  res.json(feed);
});

export default router;
