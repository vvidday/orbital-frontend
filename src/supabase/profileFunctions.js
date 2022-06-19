import { supabase } from "./supabaseClient";

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
