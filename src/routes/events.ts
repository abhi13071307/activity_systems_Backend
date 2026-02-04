import { Router } from "express";
import { createEvent } from "../services/eventService";
import { EventInput } from "../types";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body as EventInput;

  if (
    !body.actor_id ||
    !body.verb ||
    !body.object_type ||
    !body.object_id ||
    !Array.isArray(body.target_user_ids)
  ) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const event = await createEvent(body);
  res.json({ event_id: event.event_id });
});

export default router;
