import { getUserByUsername, tweetLookup } from "../api/twitter";
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

test("correctly fetches tweet info", () => {
    return tweetLookup("1540310454043566084").then((response) => {
        expect(response.id).toBe("1540310454043566084");
        expect(response.media.length).toBe(1);
        expect(response.media[0]).toBe(
            "https://pbs.twimg.com/media/FWBIMU1XkAEOHpk.jpg"
        );
    });
});
