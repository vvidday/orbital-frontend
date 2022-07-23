import { supabase } from "./supabaseClient";
import { getFollowing } from "../api/twitter";
import { 
    handleProfileOnLogin, 
    doesProfileExist, 
    doesNewUserExist,
    deductNewUser,
    checkNewUsers
} from "./profileFunctions";

/*
    Main function to update following of users within database.
    By default, it prioritizes brand new users. This helps to push
    their data into the system first.
    Those in system needs to wait for new users to clear.
*/
export const checkLimit = async (session) => {
    // check the amount of awaiting new users in system
    const newUsers = await checkNewUsers();
    const doesExistNewUser = await doesNewUserExist(session);
    const doesExistProfile = await doesProfileExist(session);
    if (doesExistProfile && !doesExistNewUser) { // user already exists
        const profileTime = await profileTimeDifference(session)
        //console.log(profileTime)
        if (newUsers == 0 && profileTime >= 30.0) {
            const updateDatabase = await updateFollowings(session);// tries to update user's following
            const updatingTime = await updateProfileTime(session);// updates the update time in table
            return true;
        }
    } else { // its a new user
        const updateDatabase = await updateFollowings(session); // tries to update user's following
        const deletingNewUser = await deductNewUser(session); // deletes new users
        const updatingTime = await updateProfileTime(session);// updates the update time in table
        return true;
    }
    return false;
}

// Update user followings
export const updateFollowings = async (session) => {
    const userID = session.user.user_metadata.provider_id
    const response = await getFollowing(userID); //-> [{id:String, name:String, username:String}]
    const id_array = response.map((i) => i.username)
        
    const { data, error } = await supabase
            .from('profiles')
            .update({ followings: id_array })
            .match({ id: session["user"]["id"] })
    if (error != null) {
        console.log(error);
        return false;
    }
    return true
}

// Gets the followings of a user from the database
export const getFollowingSaved = async (session) => {
    const {data, error } = await supabase
        .from("profiles")
        .select("followings")
        .eq("id", session["user"]["id"]);
    if (error != null) {
        console.log(error);
        return false;
    }
    return data
}

// Updates the profile time in the database
// By default, setTime is empty, used only for testing purposes
export const updateProfileTime = async (session, setTime="") => {
    const currentTime = getCurrentTime(setTime);
    const { data, error } = await supabase
            .from('profiles')
            .update({ lastUpdate: currentTime })
            .match({ id: session["user"]["id"] })
    if (error != null) {
        console.log(error);
        return false;
    }
    return currentTime
}

// Main function to get the time differnce between the current time and individual profile time
// By default, setTime is empty, used only for testing purposes
export const profileTimeDifference = async (session, setTime="") => {
    const currentTime = getCurrentTime(setTime);
    //console.log(currentTime)
    const previous_update = await lastProfileUpdateTime(session);
    
    // Stored time is no timezone, additional "Z" is to indicate to change to current timezone
    const date1 = new Date(currentTime);
    const date2 = new Date(previous_update + "Z");
    //console.log(date1)
    //console.log(date2)
    return (date1 - date2) / (1000*60);
}

// Checks the last individual profile call to Twitter
export const lastProfileUpdateTime = async (session) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("lastUpdate")
        .match({id: session["user"]["id"]});
    return data[0].lastUpdate;
}

// Returns the current time
// By default, setTime is empty, used only for testing purposes
export const getCurrentTime = (setTime = "") => {
    if (setTime === "") {
        return ((new Date()).toISOString()).toLocaleString('en-SG');
    }
    return setTime;
}