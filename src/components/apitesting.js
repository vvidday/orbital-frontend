import React from "react";
import { useState } from "react";
import { getUserByUsername } from "../api/twitter";
import { getTimeline } from "../api/twitter";

export const ApiTest = () => {
  const [username, setUsername] = useState("");
  const [id, setId] = useState("");
  const [result, setResult] = useState({});
  const [result2, setResult2] = useState({});
  const [exreplies, setExreplies] = useState(false);
  const [exretweets, setExretweets] = useState(false);


  return (
    <div>
      <h2>Api Testing</h2>
      <h3>User</h3>
      <div className="simpleform">
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button
          onClick={async () => {
            try {
                const response = await getUserByUsername(username);
                setResult(response.data);
            } catch (error) {
                console.log(error);
            }
            setUsername("");
          }}
        >
          Get User
        </button>
        <div>{JSON.stringify(result)}</div>
      </div>
    
      <h3>Timeline</h3>
      <div className="simpleform">
        <input
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
        <label htmlFor="replies">Exclude replies</label>
        <input id="replies" type="checkbox" value={exreplies} onChange={()=>setExreplies(!exreplies)}></input>
        <label htmlFor="retweets">Exclude retweets</label>
        <input id="retweets" type="checkbox" value={exretweets} onChange={()=>setExretweets(!exretweets)}></input>
        <button
          onClick={async () => {
            try {
                const response = await getTimeline(id, exreplies, exretweets);
                setResult2(response.data);
            } catch (error) {
                console.log(error);
            }
            setId("");
          }}
        >
          Get Timeline
        </button>
        <div>{JSON.stringify(result2)}</div>
      </div>
    </div>
  );
};
