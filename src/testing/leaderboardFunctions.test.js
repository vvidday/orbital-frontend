import {
    newLBEntryAnon,
    getGroupLB,
    deleteLBEntryAnon,
} from "../supabase/leaderboardFunctions";

test("newLBEntryAnon correctly inserts an anoynmous entry in the leaderboard database that is detected by getGroupLB", () => {
    return newLBEntryAnon("JestTestGroup", "Test Player", "40")
        .then(() => {
            return getGroupLB("JestTestGroup");
        })
        .then((data) => {
            expect(data.length).toBe(1);
            expect(data[0].playerNameAnon).toBe("Test Player");
            expect(data[0].score).toBe(40);
            expect(data[0].groupID).toBe("JestTestGroup");
        })
        .then(() => {
            return deleteLBEntryAnon("JestTestGroup", "Test Player", "40");
        })
        .then((data) => {
            console.log(data);
        });
});
