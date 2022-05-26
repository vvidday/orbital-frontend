import React from "react";

export const Nav = ({ testing, setTesting }) => {
    return (
        <nav id="navbar">
            <div className="title">Who Tweeted That?</div>
            <div>
                <label htmlFor="testing">
                    Testing Mode (ON = dummy data, OFF = query API){" "}
                </label>
                <input
                    type="checkbox"
                    id="testing"
                    defaultChecked
                    value={testing}
                    onChange={() => {
                        setTesting(!testing);
                    }}
                ></input>
            </div>
        </nav>
    );
};
