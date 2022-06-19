import axios from "axios";

const BASE = "https://orbital-api-vvidday.vercel.app/api/";

export async function getUserByUsername(username) {
    try {
        const data = await axios.get(BASE + "userbyusername", {
            params: {
                username: username,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getTimeline(
    userid,
    excReplies = false,
    excRetweets = false
) {
    try {
        const params = { id: userid };
        if (excReplies && excRetweets) {
            params["exclude"] = "retweets,replies";
        } else if (excReplies) {
            params["exclude"] = "replies";
        } else if (excRetweets) {
            params["exclude"] = "retweets";
        }
        const data = await axios.get(BASE + "usertimeline", {
            params: params,
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/*
Function that returns array of accounts that the user is following.
*/
export async function getFollowing(userid) {
    try {
        // Result array to be returned
        const accounts = [];
        // Pagination token to be used in API calls
        let pagToken = "";

        // Loop 15 times due to twitter rate limit - at most, can grab 1500 following.
        // Note that only 8 accounts can be used for a single game.

        for (let i = 0; i < 15; i++) {
            // On first call, no pagination token.
            let params =
                i === 0 ? { id: userid } : { id: userid, token: pagToken };

            const response = await axios.get(BASE + "following", {
                params: params,
            });
            const data = response.data;

            // Push all results into array
            data["_realData"]["data"].forEach((item) => accounts.push(item));
            // Set pagination token for next call
            // If pagination token doesn't exist, we've reached the end of the following list
            if (data["_realData"]["meta"]["next_token"] == null) break;
            pagToken = data["_realData"]["meta"]["next_token"];
        }
        return accounts;
    } catch (error) {
        console.log(error);
        return error;
    }
}
