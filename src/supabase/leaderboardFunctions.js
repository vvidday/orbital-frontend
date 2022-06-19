import { supabase } from "./supabaseClient";

// Local Function that creates a new (logged in) entry in leaderboard table (Exported only for testing)
export const newLBEntry = async (groupID, playerID, playerName, score) => {
    const row = {
        playerID: playerID,
        playerName: playerName,
        score: score,
        groupID: groupID,
    };
    const { data, error } = await supabase.from("Leaderboard").insert(row);
    if (error != null) {
        console.log(error);
        return error;
    }
    return data;
};

// Local Function that handles the actual updating of a leaderboard entry (Exported only for testing)
export const updateLBEntry = async (groupID, playerID, score) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .update([{ score: score }])
        .eq("groupID", groupID)
        .eq("playerID", playerID);
    return error === null;
};

// Local Function to determine if leaderboard entry exists for a player for a specific group. (Exported only for testing)
// Returns the row if it exists.
export const dataIfExists = async (groupID, playerID) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .select("*")
        .eq("groupID", groupID)
        .eq("playerID", playerID);
    if (error != null) {
        console.log(error);
        return error;
    }
    return data;
};

// Local, test-only function to delete LB entry. Exported only for testing
export const deleteLBEntry = async (groupID, playerID) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .delete()
        .eq("groupID", groupID)
        .eq("playerID", playerID);
    return error === null;
};

/*
    updateLB - Updates leaderboard entry of a specific player on a specific group if it is the player's personal best.
    @param groupID - ID of group that the game was played on
    @param playerID - UUID of player (to be fetched from auth/session)
    @param score - integer representing score of this round
    @return Boolean value indicating success/failure of operation
*/
export const updateLB = async (groupID, playerID, playerName, score) => {
    // Check if entry exists
    const data = await dataIfExists(groupID, playerID);
    // Entry exists, check current score
    if (data.length === 1) {
        // If current score is less than new score, update LB entry.
        if (data[0]["score"] < score) {
            return updateLBEntry(groupID, playerID, score);
        }
        // Entry doesn't exist -> Create new entry
    } else {
        return newLBEntry(groupID, playerID, playerName, score);
    }
    return false;
};

/*
    newLBEntryAnon - Creates a new anonymous leaderboard entry. Anonymous = player not signed in.
    @param groupID - ID of group that the game was played on
    @param playerNameAnon - Name of the anonymous player
    @param score - integer representing the score to be submitted
    @return Boolean value indicating success/failure of operation
*/
export const newLBEntryAnon = async (groupID, playerNameAnon, score) => {
    const row = {
        playerNameAnon: playerNameAnon,
        score: score,
        groupID: groupID,
    };
    const { data, error } = await supabase.from("Leaderboard").insert(row);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
};

/*
    getGroupLB - Get all entries in the leaderboard by groupID. Used to fetch highscores page for a specific group.
    @param groupID - ID of group to be retrieved
    @return Array of Javascript objects where each object represents an entry in the leaderboard table 
*/
export const getGroupLB = async (groupID) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .select("*")
        .eq("groupID", groupID);
    if (error != null) {
        console.log(error);
        return error;
    }
    return data;
};

/*
    deleteLBEntryAnon - Delete an anonymous leaderboard entry. Only used for unit testing purposes (There is no case where an anonymous entry will be deleted.)
    @param groupID, playerNameAnon, score - details of entry
*/
export const deleteLBEntryAnon = async (groupID, playerNameAnon, score) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .delete()
        .eq("groupID", groupID)
        .eq("playerNameAnon", playerNameAnon)
        .eq("score", score);
    return data;
};
