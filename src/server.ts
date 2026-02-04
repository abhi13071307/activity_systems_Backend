import express from "express";
import cors from "cors";
import { initDB } from "./db";

import eventsRouter from "./routes/events";
import feedRouter from "./routes/feed";
import notificationsRouter from "./routes/notifications";
import analyticsRouter from "./routes/analytics";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

initDB();

app.use("/events", eventsRouter);
app.use("/feed", feedRouter);
app.use("/notifications", notificationsRouter);
app.use("/top", analyticsRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
