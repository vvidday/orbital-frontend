import {
    newGroup,
    isDuplicate,
    generateGroupID,
    idToHandles,
} from "../supabase/groupFunctions";

test("generateGroupID correctly generates string representing the sorted array concatenated together", () => {
    expect(generateGroupID(["foo", "bar", "baz", "qux"])).toBe("barbazfooqux");
    expect(generateGroupID(["Foo", "bar", "Baz", "qux"])).toBe("barbazfooqux");
    expect(generateGroupID(["qux", "Baz", "bar", "Foo"])).toBe("barbazfooqux");
});

test("isDuplicate correctly returns false for an entry that is not inside the database", () => {
    return isDuplicate(["19234", "234223"]).then((response) => {
        expect(response).toBe(false);
    });
});

test("isDuplicate correctly returns true for an entry that is not inside the database", () => {
    return isDuplicate([
        "BarackObama",
        "katyperry",
        "Cristiano",
        "justinbieber",
    ]).then((response) => {
        expect(response).toBe(true);
    });
});

test("idToHandles correctly converts id to handle array", () => {
    return idToHandles("aocberniesandersdonaldjtrumpjrpotustedcruz").then(
        (response) => {
            expect(response.length).toBe(5);
            expect(response[0]).toBe("aoc");
            expect(response[1]).toBe("berniesanders");
            expect(response[2]).toBe("donaldjtrumpjr");
            expect(response[3]).toBe("potus");
            expect(response[4]).toBe("tedcruz");
        }
    );
});
