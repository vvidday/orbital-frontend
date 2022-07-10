import {
    newEntry,
    createForGroup,
    getCurrent,
    statsCorrect,
    statsWrong,
    deleteEntry,
    advancedStats,
} from "../supabase/statisticsGroupFunctions";

test("newEntry creates entries correctly", () => {
    return newEntry("JestTestGroup", "TestUsername").then((res) => {
        expect(res.length).toBe(1);
    });
});
test("getCurrent returns correctly", () => {
    return getCurrent("JestTestGroup", "testusername").then((res) => {
        expect(res[0]["correct"]).toBe(0);
        expect(res[0]["wrong"]).toBe(0);
    });
});

test("Increments work", () => {
    return statsCorrect("JestTestGroup", "testusername")
        .then(() => getCurrent("JestTestGroup", "testusername"))
        .then((res) => {
            expect(res[0]["correct"]).toBe(1);
            expect(res[0]["wrong"]).toBe(0);
        });
});

test("Decrements work", () => {
    return statsWrong("JestTestGroup", "testusername")
        .then(() => getCurrent("JestTestGroup", "testusername"))
        .then((res) => {
            expect(res[0]["correct"]).toBe(1);
            expect(res[0]["wrong"]).toBe(1);
        });
});

test("Cleanup", () => {
    return deleteEntry("JestTestGroup", "testusername").then((res) => {
        expect(res.length).toBe(1);
    });
});
