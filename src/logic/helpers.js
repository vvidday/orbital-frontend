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
