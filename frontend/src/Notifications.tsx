import { useEffect, useState } from "react";

interface Props {
  userId: number;
}

export default function Notifications({ userId }: Props) {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const es = new EventSource(
      `http://localhost:3000/notifications/stream?user_id=${userId}`
    );

    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setItems((prev) => [data, ...prev]);
    };

    return () => es.close();
  }, [userId]);

  return (
    <div className="card">
      <h2>Live Notifications</h2>
      {items.map((n, i) => (
        <div key={i} className="item">
          {n.verb} on {n.object_id} (from {n.actor_id})
        </div>
      ))}
    </div>
  );
}
