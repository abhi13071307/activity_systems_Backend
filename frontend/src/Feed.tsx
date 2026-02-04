import { useEffect, useState } from "react";

interface Props {
  userId: number;
}

export default function Feed({ userId }: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);

  async function load() {
    const params = new URLSearchParams({
      user_id: String(userId),
      limit: "5"
    });
    if (cursor) params.append("cursor", cursor);

    const res = await fetch(
      `http://localhost:3000/feed?${params.toString()}`
    );
    const data = await res.json();

    setItems((prev) => [...prev, ...data.items]);
    setCursor(data.next_cursor);
  }

  useEffect(() => {
    setItems([]);
    setCursor(null);
    load();
  }, [userId]);

  return (
    <div className="card">
      <h2>Activity Feed</h2>

      {items.map((e, i) => (
        <div key={i} className="item">
          {e.event_id}
        </div>
      ))}

      {cursor && <button onClick={load}>Load more</button>}
    </div>
  );
}
