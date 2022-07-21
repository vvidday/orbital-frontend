import { supabase } from "./supabaseClient";
import { getFollowing } from "../api/twitter";
import { newProfile } from "./profileFunctions";
import { doesProfileExist } from "./profileFunctions";

// Private function to create a new profile in the database. (Exported only for testing, not to be used elsewhere)
export const newProfileWithFollowing = async (session, follows) => {
    const row = {
        id: session["user"]["id"],
        username: session["user"]["user_metadata"]["user_name"],
        avatar_url: session["user"]["user_metadata"]["avatar_url"],
        followings: follows
    };
    const { data, error } = await supabase.from("profiles").insert(row);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
};
/*
    Checks if we are reaching the data limit by Twitter. Since Twitter's data
    limit is 15 requests / 15 mins, this limits to 1 update / min
    By default, it prioritizes brand new users. This helps to push
    their data into the system first.
    Those in system needs to wait for new users to clear.

    @params existence - boolean value to indicate if user is in the database
    @params session - session data of the current user
*/
export const checkLimit = async (existence, session) => {
    // check the amount of awaiting new users in system
    const newUsers = await checkNewUsers();
    // checks the time difference for waiting time
    const timeSinceUpdate = await timeDifference();
    if (existence) { // user already exists
        if (newUsers == 0 && timeSinceUpdate >= 1.0) {
            const updatingTime = await updateTime();
            return true;
        }
    } else { // its a new user
        const addingUser = await handleNewUser(session) // add user if he is not already in
        if (timeSinceUpdate >= 1.0) {
            const updatingTime = await updateTime();
            const deletingUser = await deductNewUser(session); // removes new user from waiting list
            return true;
        }
    }
    return false;
}

/*
    Main function to update user followings without reaching rate limit.
*/
export const updateFollowings = async (session) => {
    const userID = session.user.user_metadata.provider_id
    // checks if user exists in database
    const doesExist = await doesProfileExist(session);
    // checks if we can update without exceed limit
    const dataLimit = await checkLimit(doesExist, session)
    if (!dataLimit) {
        return false
    }
    const response = await getFollowing(userID); //-> [{id:String, name:String, username:String}]
    const id_array = response.map((i) => i.username)
    
    if (!doesExist) {
        const success = await newProfile(session, id_array);
        return success;
    } else {
        const { data, error } = await supabase
            .from('profiles')
            .update({ followings: id_array })
            .match({ id: session["user"]["id"] })
    }
    return true
}

/*
    Gets the followings of a user from the database
*/
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

// Main function to handle new users, words hand in hand with waiting list for new users
export const handleNewUser = async (session) => {
    const doesExist = await doesNewUserExist(session);
    if (!doesExist) {
        const success = await addNewUser(session);
        return success;
    }
    return true
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
    console.log("count")
    console.log(data)
    return data
}

// Main function to get the time differnce between the current time and system time
export const timeDifference = async () => {
    const currentTime = ((new Date()).toISOString()).toLocaleString('en-SG')
    //console.log(currentTime)
    const previous_update = await lastUpdateTime()
    //console.log(previous_update)
    const date1 = new Date(currentTime)
    const date2 = new Date(previous_update + "Z")
    return (date1 - date2) / (1000*60)
}

// Checks the last api call to Twitter
export const lastUpdateTime = async () => {
    const { data, error } = await supabase
        .from("timeSinceUpdate")
        .select("time_since_update")
    return data[0].time_since_update
}

// Updates the time in the database
export const updateTime = async () => {
    const currentTime = ((new Date()).toISOString()).toLocaleString('en-SG')
    const { data, error } = await supabase
            .from('timeSinceUpdate')
            .update({ time_since_update: currentTime })
            .match({ id: 1 })
    if (error != null) {
        console.log(error);
        return false;
    }
    return currentTime
}