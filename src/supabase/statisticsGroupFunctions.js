import { generateGroupID } from "./groupFunctions";
import { supabase } from "./supabaseClient";

export const newEntry = async (groupID, username) => {
    const row = {
        groupID: groupID,
        username: username.toLowerCase(),
        correct: 0,
        wrong: 0,
    };
    const { data, error } = await supabase.from("statisticsGroup").insert(row);
    if (error != null) {
        console.log(error);
        return error;
    }
    return data;
};

// Creates entries for all usernames in that group. To be called upon creation of new group.
// Accepts handles since that is what newGroup accepts also, and this function will be called along with that.
export const createForGroup = async (handles) => {
    const groupID = generateGroupID(handles);
    for (let i = 0; i < handles.length; i++) {
        const res = await newEntry(groupID, handles[i]);
    }
};

// Get correct/wrong for entry.
export const getCurrent = async (groupID, username) => {
    const { data, error } = await supabase
        .from("statisticsGroup")
        .select("correct, wrong")
        .eq("groupID", groupID)
        .eq("username", username);
    return data;
};

// Increase correct by one
export const statsCorrect = async (groupID, username) => {
    const res = await getCurrent(groupID, username);
    const correct = res[0]["correct"] + 1;
    const wrong = res[0]["wrong"];
    // Calculate new percentage
    const percentage = Math.round((100 * correct) / (correct + wrong));
    const { data, error } = await supabase
        .from("statisticsGroup")
        .update([{ correct: correct, percentage: percentage }])
        .eq("groupID", groupID)
        .eq("username", username);
    return data;
};

// Increase wrong by one
export const statsWrong = async (groupID, username) => {
    const res = await getCurrent(groupID, username);
    const correct = res[0]["correct"];
    const wrong = res[0]["wrong"] + 1;
    // Calculate new percentage
    const percentage = Math.round((100 * correct) / (correct + wrong));
    const { data, error } = await supabase
        .from("statisticsGroup")
        .update([{ wrong: wrong, percentage: percentage }])
        .eq("groupID", groupID)
        .eq("username", username);
    return data;
};

// Delete Entry
export const deleteEntry = async (groupID, username) => {
    const { data, error } = await supabase
        .from("statisticsGroup")
        .delete()
        .eq("groupID", groupID)
        .eq("username", username);
    return data;
};

// Get all entries for specific groupID (to be used in highscores page)
export const advancedStats = async (groupID) => {
    const { data, error } = await supabase
        .from("statisticsGroup")
        .select("*")
        .eq("groupID", groupID)
        .not("percentage", "eq", -1);
    if (error != null) return error;
    return data;
};
