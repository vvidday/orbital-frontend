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
    const [cond, setCond] = useState(false);
    const [cond2, setCond2] = useState(false);

    return (
        <div>
            {cond === false ? <></> : <div data-testid="cond"></div>}
            {cond2 === false ? <></> : <div data-testid="cond2"></div>}

            <h2>Api Testing</h2>
            <h3>User</h3>
            <div className="simpleform">
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                ></input>
                <button
                    data-testid="user-api-btn"
                    onClick={async () => {
                        try {
                            const response = await getUserByUsername(username);
                            setResult(response.data);
                            setCond(true);
                        } catch (error) {
                            console.log(error);
                        }
                        setUsername("");
                    }}
                >
                    Get User
                </button>
                <div data-testid="user-api-result">
                    {JSON.stringify(result)}
                </div>
            </div>
            <h2 data-testid="x">{username}</h2>
            <h3>Timeline</h3>
            <div className="simpleform">
                <input
                    placeholder="User ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                ></input>
                <label htmlFor="replies">Exclude replies</label>
                <input
                    id="replies"
                    type="checkbox"
                    value={exreplies}
                    onChange={() => setExreplies(!exreplies)}
                ></input>
                <label htmlFor="retweets">Exclude retweets</label>
                <input
                    id="retweets"
                    type="checkbox"
                    value={exretweets}
                    onChange={() => setExretweets(!exretweets)}
                ></input>
                <button
                    data-testid="timeline-api-btn"
                    onClick={async () => {
                        try {
                            const response = await getTimeline(
                                id,
                                exreplies,
                                exretweets
                            );
                            setResult2(response.data);
                            setCond2(true);
                        } catch (error) {
                            console.log(error);
                        }
                        setId("");
                    }}
                >
                    Get Timeline
                </button>
                <div data-testid="timeline-api-result">
                    {JSON.stringify(result2)}
                </div>
            </div>
        </div>
    );
};
