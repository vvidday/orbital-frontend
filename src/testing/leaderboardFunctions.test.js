import {
    newLBEntryAnon,
    getGroupLB,
    deleteLBEntryAnon,
    newLBEntry,
    dataIfExists,
    updateLB,
    deleteLBEntry,
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
            //console.log(data);
        });
});

test("newLBEntry correctly inserts a logged entry in database that is detected by dataIfExists", () => {
    return newLBEntry(
        "JestTestGroup",
        "46a60792-a172-4f18-b737-376296165388",
        "useinLBTest",
        10
    ).then((result) => {
        return dataIfExists(
            "JestTestGroup",
            "46a60792-a172-4f18-b737-376296165388"
        )
            .then((result) => {
                //console.log(result);
                expect(result.length).toBe(1);
                expect(result[0].playerID).toBe(
                    "46a60792-a172-4f18-b737-376296165388"
                );
                expect(result[0].playerName).toBe("useinLBTest");
                expect(result[0].score).toBe(10);
                return dataIfExists(
                    "JestTestGroup",
                    "a84f2508-79a2-475f-97ff-6b3424ee77b1"
                );
            })
            .then((result) => expect(result.length).toBe(0));
    });
});

test("updateLBEntry successfully updates when score is greater, and doesn't when score is less", () => {
    // New entry with score 11 (bigger than 10), SHOULD update.
    return updateLB(
        "JestTestGroup",
        "46a60792-a172-4f18-b737-376296165388",
        "useinLBTest",
        11
    )
        .then(() =>
            dataIfExists(
                "JestTestGroup",
                "46a60792-a172-4f18-b737-376296165388"
            )
        )
        .then((result) => {
            expect(result[0]["score"]).toBe(11);
            // New entry with score 10, SHOULD NOT update.
            return updateLB(
                "JestTestGroup",
                "46a60792-a172-4f18-b737-376296165388",
                "useinLBTest",
                10
            );
        })
        .then(() =>
            dataIfExists(
                "JestTestGroup",
                "46a60792-a172-4f18-b737-376296165388"
            )
        )
        .then((result) => {
            expect(result[0]["score"]).toBe(11);
        });
});

test("Delete test entries for cleanup", () => {
    return deleteLBEntry(
        "JestTestGroup",
        "46a60792-a172-4f18-b737-376296165388"
    )
        .then(() =>
            dataIfExists(
                "JestTestGroup",
                "46a60792-a172-4f18-b737-376296165388"
            )
        )
        .then((result) => expect(result.length).toBe(0));
});
