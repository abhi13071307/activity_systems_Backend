import { db } from "../db";

interface FeedItem {
  event_id: string;
  created_at: number;
}

export function getFeed(
  userId: number,
  cursor?: string,
  limit = 20
): Promise<{ items: FeedItem[]; next_cursor: string | null }> {
  return new Promise((resolve, reject) => {
    let params: any[] = [userId];
    let whereCursor = "";

    if (cursor) {
      const [ts, eventId] = cursor.split("|");
      whereCursor =
        "AND (created_at < ? OR (created_at = ? AND event_id < ?))";
      params.push(Number(ts), Number(ts), eventId);
    }

    params.push(limit + 1);

    const sql = `
      SELECT event_id, created_at
      FROM user_event_targets
      WHERE user_id = ?
      ${whereCursor}
      ORDER BY created_at DESC, event_id DESC
      LIMIT ?
    `;

    db.all(sql, params, (err, rows: FeedItem[]) => {
      if (err) return reject(err);

      let nextCursor: string | null = null;
      if (rows.length > limit) {
        const last = rows[limit - 1];
        nextCursor = `${last.created_at}|${last.event_id}`;
        rows = rows.slice(0, limit);
      }

      resolve({ items: rows, next_cursor: nextCursor });
    });
  });
}
