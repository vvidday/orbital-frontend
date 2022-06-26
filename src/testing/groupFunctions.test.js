import {
    newGroup,
    isDuplicate,
    generateGroupID,
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
