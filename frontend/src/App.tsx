import { useState } from "react";
import CreateEvent from "./CreateEvent";
import Feed from "./Feed";
import Notifications from "./Notifications";
import "./style.css";

export default function App() {
  const [userId, setUserId] = useState(2);

  return (
    <div className="container">
      <h1>Activity Feed Demo</h1>

      <div className="user-select">
        <label>User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        />
      </div>

      <CreateEvent />
      <Notifications userId={userId} />
      <Feed userId={userId} />
    </div>
  );
}
