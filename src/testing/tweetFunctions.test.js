import {
    insertTweets,
    retrieveTweets,
    deleteTweets,
} from "../supabase/tweetFunctions";

const SAMPLE_TWEETS = [
    { id: "testID1", text: "lorem ipsum" },
    { id: "testID2", text: "lorem ipsum 2" },
    { id: "testID3", text: "lorem ipsum 3" },
];
test("insertTweets should properly insert tweets that are detected by retrieveTweets", () => {
    return insertTweets(SAMPLE_TWEETS, "TestID")
        .then((res) => {
            return retrieveTweets("TestID");
        })
        .then((res) => {
            expect(res.length).toBe(3);
            expect(res[0]["id"]).toBe("testID1");
        });
});

test("deleteTweets should properly delete all tweets with specified authorID", () => {
    return deleteTweets("TestID")
        .then(() => retrieveTweets("TestID"))
        .then((res) => {
            expect(res.length).toBe(0);
        });
});

test("retrieveTweets should return empty array for authorid that does not exist", () => {
    return retrieveTweets("INVALIDID").then((res) => {
        expect(res.length).toBe(0);
    });
});
