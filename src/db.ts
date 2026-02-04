import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("activity.db");

export function initDB() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS events (
        event_id TEXT PRIMARY KEY,
        actor_id INTEGER,
        verb TEXT,
        object_type TEXT,
        object_id TEXT,
        created_at INTEGER
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS user_event_targets (
        user_id INTEGER,
        event_id TEXT,
        created_at INTEGER,
        PRIMARY KEY (user_id, event_id)
      )
    `);

    db.run(`
      CREATE INDEX IF NOT EXISTS idx_feed_user_time
      ON user_event_targets (user_id, created_at DESC)
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS notifications (
        user_id INTEGER,
        event_id TEXT,
        created_at INTEGER
      )
    `);
  });
}
