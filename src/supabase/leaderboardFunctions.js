import { supabase } from "./supabaseClient";

export const newLBEntry = async (groupID, playerID, score) => {};

// Local Function that handles the actual updating of a leaderboard entry
const updateLBEntry = async (groupID, playerID, score) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .update([{ score: score }])
        .eq("groupID", groupID)
        .eq("playerID", playerID);
};

// Local Function to get score of a player for a specific group
const getPlayerScore = async (groupID, playerID) => {
    const { data, error } = await supabase
        .from("Leaderboard")
        .select("score")
        .eq("groupID", groupID)
        .eq("playerID", playerID);
    if (error != null) {
        console.log(error);
        return error;
    }
    return data;
};

/*
    updateLB - Updates leaderboard entry of a specific player on a specific group if it is the player's personal best.
    @param groupID - ID of group that the game was played on
    @param playerID - UUID of player (to be fetched from auth/session)
    @param score - integer representing score of this round
    @return Boolean value indicating success/failure of operation
*/
export const updateLB = async (groupID, playerID, score) => {
    // TODO: Check if entry exists -> If exists:
    if (getPlayerScore < score) {
        updateLBEntry(groupID, playerID, score);
        return true;
    }
    // TODO: Else -> create new entry
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
    console.log(data);
    console.log(error);
    return data;
};
