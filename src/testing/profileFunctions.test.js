import {
    newProfile,
    doesProfileExist,
    deleteProfile,
    handleProfileOnLogin,
} from "../supabase/profileFunctions";
import mockSession from "../data/mockSession";

test("newProfile successfully creates new entry in profile table on database", () => {
    return newProfile(mockSession)
        .then((result) => {
            return doesProfileExist(mockSession);
        })
        .then((result) => expect(result).toBe(true));
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
