import { getTimeline } from "../api/twitter";
import { supabase } from "./supabaseClient";

// Insert array of tweets
export const insertTweets = async (tweets, authorID) => {
    const row = [];
    for (const tweet of tweets) {
        row.push({
            id: tweet["id"],
            authorid: authorID,
            text: tweet["text"],
            timestamp: new Date().toISOString(),
        });
    }
    const { data, error } = await supabase.from("tweets").insert(row);
    if (error !== null) return error;
    return data;
};

// Retrieve tweets by authorid
export const retrieveTweets = async (authorID) => {
    const { data, error } = await supabase
        .from("tweets")
        .select("*")
        .eq("authorid", authorID);
    if (error != null) return error;
    return data;
};

// Delete tweets by authorid
export const deleteTweets = async (authorID) => {
    const { data, error } = await supabase
        .from("tweets")
        .delete()
        .eq("authorid", authorID);
    if (error != null) return error;
    return data;
};

export const getTimelineSupabase = async (authorID) => {
    // Check if tweets exist in supabase
    const currentTweets = await retrieveTweets(authorID);
    if (currentTweets.length === 0) {
        // No local tweets - Get tweets, and store
        const response = await getTimeline(authorID, true, true, 50);
        insertTweets(response.data.data, authorID);
        return response.data.data;
    } else {
        // Check time difference
        const timeOfTweets = new Date(currentTweets[0]["timestamp"] + "Z");
        const currentDate = new Date();
        // Add 30 minutes to time of tweets
        timeOfTweets.setMinutes(timeOfTweets.getMinutes() + 30);
        if (timeOfTweets < currentDate) {
            // More than 30 minutes since last update
            // Fetch tweets and delete current database entries in parallel
            let [response, _] = await Promise.all([
                getTimeline(authorID, true, true, 50),
                deleteTweets(authorID),
            ]);
            // Store tweets
            insertTweets(response.data.data, authorID);
            return response.data.data;
        } else {
            // Return currently stored tweets
            return currentTweets;
        }
    }
};
