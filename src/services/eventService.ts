import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { EventInput, EventRecord } from "../types";
import { notificationHub } from "./notificationHub";
import { analytics1m, analytics5m, analytics1h } from "./analyticsWindow";

export function createEvent(input: EventInput): Promise<EventRecord> {
  return new Promise((resolve, reject) => {
    const event: EventRecord = {
      event_id: uuidv4(),
      created_at: input.created_at ?? Date.now(),
      ...input
    };

    db.serialize(() => {
      db.run(
        `
        INSERT INTO events (event_id, actor_id, verb, object_type, object_id, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          event.event_id,
          event.actor_id,
          event.verb,
          event.object_type,
          event.object_id,
          event.created_at
        ]
      );

      for (const userId of event.target_user_ids) {
        db.run(
          `
          INSERT INTO user_event_targets (user_id, event_id, created_at)
          VALUES (?, ?, ?)
          `,
          [userId, event.event_id, event.created_at]
        );

        db.run(
          `
          INSERT INTO notifications (user_id, event_id, created_at)
          VALUES (?, ?, ?)
          `,
          [userId, event.event_id, event.created_at]
        );

        notificationHub.push(userId, event);
      }

      analytics1m.increment(event.object_id);
      analytics5m.increment(event.object_id);
      analytics1h.increment(event.object_id);

      resolve(event);
    });
  });
}
