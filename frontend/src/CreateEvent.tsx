import { useState } from "react";

export default function CreateEvent() {
  const [actorId, setActorId] = useState(1);
  const [verb, setVerb] = useState("like");
  const [objectId, setObjectId] = useState("post-1");
  const [targets, setTargets] = useState("2");

  async function submit() {
    await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        actor_id: actorId,
        verb,
        object_type: "post",
        object_id: objectId,
        target_user_ids: targets.split(",").map(Number)
      })
    });

    alert("Event created");
  }

  return (
    <div className="card">
      <h2>Create Action</h2>

      <input
        placeholder="Actor ID"
        value={actorId}
        onChange={(e) => setActorId(Number(e.target.value))}
      />

      <select value={verb} onChange={(e) => setVerb(e.target.value)}>
        <option value="like">like</option>
        <option value="comment">comment</option>
        <option value="follow">follow</option>
        <option value="purchase">purchase</option>
      </select>

      <input
        placeholder="Object ID"
        value={objectId}
        onChange={(e) => setObjectId(e.target.value)}
      />

      <input
        placeholder="Target User IDs (comma)"
        value={targets}
        onChange={(e) => setTargets(e.target.value)}
      />

      <button onClick={submit}>Create Event</button>
    </div>
  );
}
