import { supabase } from "./supabaseClient";
import { getCurrentTime } from "./yourFollowingFunctions";

// Private function to create a new profile in the database. (Exported only for testing, not to be used elsewhere)
// By default, setTime is empty, used only for testing purposes
export const newProfile = async (session, setTime="") => {
    const currentTime = getCurrentTime(setTime);
    const row = {
        id: session["user"]["id"],
        username: session["user"]["user_metadata"]["user_name"],
        avatar_url: session["user"]["user_metadata"]["avatar_url"],
        followings: [],
        lastUpdate: currentTime
    };
    const { data, error } = await supabase.from("profiles").insert(row);
    console.log("Added User")
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
    handleProfileOnLogin - Checks if current session is a new user, 
    and creates a new entry in "profiles" and "newUsers" table if so.
    @params session - Session of current user.
    @return Boolean value representing success/failure of operation.
*/
export const handleProfileOnLogin = async (session) => {
    const doesExistProfile = await doesProfileExist(session);
    const doesExistNewUser = await doesNewUserExist(session);
    if (!doesExistProfile && !doesExistNewUser) {
        const successNewUser = await addNewUser(session);
        console.log("New User detected")
        const successProfile = await newProfile(session);
        console.log("New profile created")
        return successNewUser && successProfile;
    }
    return true;
};

// Adds a new user to the waiting list of new users
export const addNewUser = async (session) => {
    const row = {
        id: session["user"]["id"],
    };
    const { data, error } = await supabase.from("newUsers").insert(row);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
}

// Checks if the user exists in the waiting list
export const doesNewUserExist = async (session) => {
    const { data, error } = await supabase
        .from("newUsers")
        .select("*")
        .eq("id", session["user"]["id"]);
    const doesExistProfile = await doesProfileExist(session);
    if (data.length === 1) return true;
    return false;
};

// Removes new user from the waiting list
export const deductNewUser = async (session) => {
    const { data, error } = await supabase
        .from("newUsers")
        .delete()
        .eq("id", session["user"]["id"]);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
}

// Checks the number of new users in the system
export const checkNewUsers = async () => {
    const { data, error } = await supabase
        .from("newUsers")
        .select("id", {count: "exact"})
    return data
}
