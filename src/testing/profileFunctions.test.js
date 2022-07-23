import {
    newProfile,
    doesProfileExist,
    deleteProfile,
    addNewUser, 
    doesNewUserExist,
    deductNewUser,
} from "../supabase/profileFunctions";
import { 
    lastProfileUpdateTime,
    getFollowingSaved,
    updateProfileTime
} from "../supabase/yourFollowingFunctions";

const mockSession = {
    access_token: "",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "tw-6v-KhUXg2W5Xj4DJNRw",
    user: {
        id: "e4002a76-7de8-4cdc-94e0-6fa072339c90",
        aud: "authenticated",
        role: "authenticated",
        email: "xyz@xyz.com",
        email_confirmed_at: "2022-06-18T10:02:40.911228Z",
        phone: "",
        confirmed_at: "2022-06-18T10:02:40.911228Z",
        last_sign_in_at: "2022-06-18T10:02:58.772976Z",
        app_metadata: { provider: "twitter", providers: ["twitter"] },
        user_metadata: {
            avatar_url: "url",
            email: "xyz@xyz.com",
            email_verified: true,
            full_name: "testuser",
            iss: "https://api.twitter.com/1.1/account/verify_credentials.json",
            name: "testuser",
            picture: "url",
            preferred_username: "testuser",
            provider_id: "1",
            sub: "1",
            user_name: "testuser",
        },
        identities: [
            {
                id: "1",
                user_id: "e4002a76-7de8-4cdc-94e0-6fa072339c90",
                identity_data: {
                    avatar_url: "url",
                    email: "xyz@xyz.com",
                    email_verified: true,
                    full_name: "testuser",
                    iss: "https://api.twitter.com/1.1/account/verify_credentials.json",
                    name: "testuser",
                    picture: "url",
                    preferred_username: "testuser",
                    provider_id: "1",
                    sub: "1",
                    user_name: "testuser",
                },
                provider: "twitter",
                last_sign_in_at: "2022-06-18T10:02:40.909265Z",
                created_at: "2022-06-18T10:02:40.909307Z",
                updated_at: "2022-06-18T10:02:58.769697Z",
            },
        ],
        created_at: "2022-06-18T10:02:40.906199Z",
        updated_at: "2022-06-19T05:36:16.82744Z",
    },
    expires_at: 1655620575,
};



test("newProfile successfully creates new entry in profile table on database", () => {
    const testTime = "2022-06-19T05:36:16.82744"
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
    return getFollowingSaved(mockSession)
        .then((result) => expect(result[0].followings).toStrictEqual([]));
});

test("gets the correct time right after insert inside database", () => {
    const testTime = "2022-06-19T05:36:16.82744"
    return lastProfileUpdateTime(mockSession)
        .then((result) => expect(result).toBe(testTime));
});
    
test("gets the correct time after updating the time inside the database", () => {
    const testTime = ((new Date()).toISOString()).toLocaleString('en-SG');
    return updateProfileTime(mockSession, testTime)
        .then((result) => lastProfileUpdateTime(mockSession))
        .then((result) => {
            const test = new Date(testTime);
            const date = new Date(result + "Z");
            return expect(date).toStrictEqual(test)
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
