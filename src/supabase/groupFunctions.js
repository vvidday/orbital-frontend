import { supabase } from "./supabaseClient";

/*
    newGroup - Asynchronously inserts a new group into the database according to the provided twitter handles.
    @param handles - Array of twitter handles
    @return Boolean value indicating success/failure of operation
*/
export const newGroup = async (handles) => {
    if (handles.length < 2 || handles.length > 8) {
        console.log(
            "Error - groups must contain between two and eight handles."
        );
        return false;
    }

    // Object to be inserted into database
    const row = { id: generateGroupID(handles) };

    // Insert user1 to user8
    handles.map((handle, i) => {
        const key = `user${i + 1}`;
        row[key] = handle;
    });

    // Insert object into database via supabase client
    const { data, error } = await supabase.from("Group").insert([row]);
    if (error != null) {
        console.log(error);
        return false;
    }
    return true;
};

/*
    isDuplicate - Asynchronously checks if a group already exists based on given twitter handles.
    @param handles - Array of twitter handles
    @return Boolean value indicating if the group already exists. (True = exists, false = does not exist)
*/
export const isDuplicate = async (handles) => {
    if (handles.length < 2 || handles.length > 8) {
        console.log(
            "Error - groups must contain between two and eight handles."
        );
        return false;
    }
    const id = generateGroupID(handles);

    // Selecting row where id == id.  If row exists, data will be of length 1, else it will be an empty array.
    const { data, error } = await supabase
        .from("Group")
        .select("*")
        .eq("id", id);
    console.log(error);
    if (data.length === 1) return true;
    return false;
};

/*
    genearateGroupID - generates the unique group ID from an array of handles.
    @param handles - Array of twitter handles
    @return String representing the unique group ID
*/
export const generateGroupID = (handles) => {
    for (let i = 0; i < handles.length; i++) {
        handles[i] = handles[i].toLowerCase();
    }
    return handles.sort().join("");
};
