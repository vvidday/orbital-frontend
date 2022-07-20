import { supabase } from "./supabaseClient";
import { getFollowing } from "../api/twitter";

// Private function to create a new profile in the database. (Exported only for testing, not to be used elsewhere)
export const newProfile = async (session) => {
    const row = {
        id: session["user"]["id"],
        username: session["user"]["user_metadata"]["user_name"],
        avatar_url: session["user"]["user_metadata"]["avatar_url"],
    };
    const { data, error } = await supabase.from("profiles").insert(row);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
};

// Private function to check for existence of profile (Exported only for testing, not to be used elsewhere)
export const doesProfileExist = async (session) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session["user"]["id"]);
    if (data.length === 1) return true;
    return false;
};

// Private function that deletes profile entry (Exported only for testing, not to be used elsewhere)
export const deleteProfile = async (session) => {
    const { data, error } = await supabase
        .from("profiles")
        .delete()
        .eq("id", session["user"]["id"]);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
};

/*
    handleProfileOnLogin - Checks if current session is a new user, and creates a new entry in "profiles" table if so.
    @params session - Session of current user.
    @return Boolean value representing success/failure of operation.
*/
export const handleProfileOnLogin = async (session) => {
    const doesExist = await doesProfileExist(session);
    if (!doesExist) {
        const success = await newProfile(session);
        return success;
    }
    return true;
};

// Private function to create a new profile in the database. (WIP)
export const newProfileWithFollowing = async (session, followers) => {
    const row = {
        id: session["user"]["id"],
        username: session["user"]["user_metadata"]["user_name"],
        avatar_url: session["user"]["user_metadata"]["avatar_url"],
        following: followers
    };
    const { data, error } = await supabase.from("profiles").insert(row);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
};

/*
    Update following without going over rate limit (WIP)
*/
export const updateFollowings = async (session) => {
    const userID = session.user.user_metadata.provider_id
    const doesExist = await doesProfileExist(session);
    const checkLimit = await checkLimit(doesExist)
    if (!checkLimit) {
        return false
    }
    const response = await getFollowing(userID); //-> [{id:String, name:String, username:String}]
    const id_array = response.map((i) => i.id)
    
    if (!doesExist) {
        const success = await newProfileWithFollowing(session, id_array);
        return success;
    } else {
        const { data, error } = await supabase
            .from('profiles')
            .update({ following: id_array })
            .match({ id: session["user"]["id"] })
    }
    return true
}