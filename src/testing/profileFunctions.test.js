import {
    newProfile,
    doesProfileExist,
    deleteProfile,
    addNewUser,
    doesNewUserExist,
    deductNewUser,
} from "../supabase/profileFunctions";
import mockSession from "../data/mockSession";

test("newProfile successfully creates new entry in profile table on database", () => {
    const testTime = "2022-06-19T05:36:16.82744";
    return newProfile(mockSession, testTime)
        .then((result) => {
            return doesProfileExist(mockSession);
        })
        .then((result) => expect(result).toBe(true));
});

test("newProfile successfully creates new entry in new users table on database", () => {
    return addNewUser(mockSession)
        .then((result) => {
            return doesNewUserExist(mockSession);
        })
        .then((result) => expect(result).toBe(true));
});

test("gets the correct amount of following saved within database (empty)", () => {
    return getFollowingSaved(mockSession).then((result) =>
        expect(result[0].followings).toStrictEqual([])
    );
});

test("gets the correct time right after insert inside database", () => {
    const testTime = "2022-06-19T05:36:16.82744";
    return lastProfileUpdateTime(mockSession).then((result) =>
        expect(result).toBe(testTime)
    );
});

test("gets the correct time after updating the time inside the database", () => {
    const testTime = new Date().toISOString().toLocaleString("en-SG");
    return updateProfileTime(mockSession, testTime)
        .then((result) => lastProfileUpdateTime(mockSession))
        .then((result) => {
            const test = new Date(testTime);
            const date = new Date(result + "Z");
            return expect(date).toStrictEqual(test);
        });
});

test("deleteProfile successfully deletes entry in profile table on database", () => {
    return doesProfileExist(mockSession)
        .then((result) => {
            expect(result).toBe(true);
            return deleteProfile(mockSession);
        })
        .then((result) => doesProfileExist(mockSession))
        .then((result) => {
            expect(result).toBe(false);
        });
});

test("deleteProfile successfully deletes entry in new table on database", () => {
    return doesNewUserExist(mockSession)
        .then((result) => {
            expect(result).toBe(true);
            return deductNewUser(mockSession);
        })
        .then((result) => doesNewUserExist(mockSession))
        .then((result) => {
            expect(result).toBe(false);
        });
});
