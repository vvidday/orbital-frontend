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

        for (let i = 0; i < 1; i++) {
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

/*
    Function that gets more info for a list of tweets
    @param tweetIDs - array of tweet IDs
    @return Array of tweet objects
*/
export async function tweetsLookup(tweetIDs) {
    try {
        const params = {
            ids: tweetIDs.join(","),
            expansions: "attachments.media_keys",
            "media.fields": "type,url,width,height,preview_image_url",
        };
        const data = await axios.get(BASE + "tweet", { params: params });
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

/* Singular tweet lookup
Return format: {
    id: string
    media: [] array of links, ONLY if media exists.
    text: string   
}
Essentially, only change is inclusion of media link.
*/
export async function tweetLookup(tweetID) {
    try {
        const params = {
            ids: tweetID,
            expansions: "attachments.media_keys",
            "media.fields": "type,url,preview_image_url",
        };
        const res = await axios.get(BASE + "tweet", { params: params });
        const data = res.data;
        //console.log(data["data"]);
        const returnObj = {
            id: data["data"]["0"]["id"],
            text: data["data"]["0"]["text"],
        };
        // There is at least one media
        if (data.data["0"].attachments != null) {
            const media = [];
            data.includes.media.map((x) => {
                if (x["url"] != null) media.push(x["url"]);
                if (x["preview_image_url"] != null)
                    media.push(x["preview_image_url"]);
            });
            returnObj["media"] = media;
        } else {
            returnObj["media"] = [];
        }
        console.log(returnObj);
        return returnObj;
    } catch (error) {
        console.log(error);
        return error;
    }
}
