import { getUserByUsername } from "../api/twitter";
// Helper Functions

/* accsToHandles - Converts array of account objects into array of twitter handles (Strings)
 */
export const accsToHandles = (accs) => {
    const result = [];
    accs.map((entry) => {
        result.push(entry.username);
    });
    return result;
};

/* handlesToAccs - Converts array of twitter handles to array of account objects
 */
export const handlesToAccs = async (handles) => {
    const result = [];
    for (let i = 0; i < handles.length; i++) {
        const data = await getUserByUsername(handles[i]);
        result.push(data.data);
    }
    return result;
};
