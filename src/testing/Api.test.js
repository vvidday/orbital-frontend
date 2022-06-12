import { getUserByUsername } from "../api/twitter";
import { getTimeline } from "../api/twitter";

test("correctly fetches user info from twitter API", () => {
    return getUserByUsername("BarackObama").then((response) => {
        expect(response).toBeDefined;
        expect(response.data.id).toBe("813286");
    });
});

test("correctly fetches user timeline from twitter API", () => {
    return getTimeline("813286", true, true).then((response) => {
        expect(response.data.data.length).toBe(10);
    });
});
