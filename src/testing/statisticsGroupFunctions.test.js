import {
    newEntry,
    createForGroup,
    getCurrent,
    statsCorrect,
    statsWrong,
    deleteEntry,
} from "../supabase/statisticsGroupFunctions";

test("newEntry creates entries correctly", () => {
    return newEntry("JestTestGroup", "TestUsername").then((res) => {
        expect(res.length).toBe(1);
    });
});
test("getCurrent returns correctly", () => {
    return getCurrent("JestTestGroup", "TestUsername").then((res) => {
        expect(res[0]["correct"]).toBe(0);
        expect(res[0]["wrong"]).toBe(0);
    });
});

test("Increments work", () => {
    return statsCorrect("JestTestGroup", "TestUsername")
        .then(() => getCurrent("JestTestGroup", "TestUsername"))
        .then((res) => {
            expect(res[0]["correct"]).toBe(1);
            expect(res[0]["wrong"]).toBe(0);
        });
});

test("Decrements work", () => {
    return statsWrong("JestTestGroup", "TestUsername")
        .then(() => getCurrent("JestTestGroup", "TestUsername"))
        .then((res) => {
            expect(res[0]["correct"]).toBe(1);
            expect(res[0]["wrong"]).toBe(1);
        });
});

test("Cleanup", () => {
    return deleteEntry("JestTestGroup", "TestUsername").then((res) => {
        expect(res.length).toBe(1);
    });
});
