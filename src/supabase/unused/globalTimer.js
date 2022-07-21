import { supabase } from "../supabaseClient";

// Main function to get the time differnce between the current time and global system time
export const globalTimeDifference = async () => {
    const currentTime = ((new Date()).toISOString()).toLocaleString('en-SG')
    //console.log(currentTime)
    const previous_update = await lastGlobalUpdateTime()
    //console.log(previous_update)
    const date1 = new Date(currentTime)
    const date2 = new Date(previous_update + "Z")
    return (date1 - date2) / (1000*60)
}

// Checks the last global api call to Twitter
export const lastGlobalUpdateTime = async () => {
    const { data, error } = await supabase
        .from("timeSinceUpdate")
        .select("time_since_update")
    return data[0].time_since_update
}

// Updates the global time in the database
export const updateGlobalTime = async () => {
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
