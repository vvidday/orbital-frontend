import { data } from "../data/bufferData";
import { getUserByUsername, tweetLookup } from "../api/twitter";
import { getTimeline } from "../api/twitter";
import { setChoices } from "../logic/setChoices";
import { getTimelineNew } from "../api/twitter-new";

/*
    New Buffer Function
    Makes API call for each account 
*/
export async function buffer(accounts) {
    //console.log("here");
    // Array to be returned
    const gameData = [];
    // Iterate through accounts and call API for each.
    for (let i = 0; i < accounts.length; i++) {
        const accountData = { account: { ...accounts[i] } };
        // Try new endpoint (go server)
        const response = await getTimelineNew(accounts[i]["id"]);
        if (response.data === null) {
            const alternateresponse = await getTimeline(
                accounts[i]["id"],
                true,
                true,
                50
            );
            const arr = alternateresponse.data.data;
            accountData["tweets"] = [...arr];
            gameData.push(accountData);
        } else {
            console.log("here?");
            const arr = response.data;
            accountData["tweets"] = [...arr];
            gameData.push(accountData);
        }
    }
    console.log(gameData);
    return gameData;
}

/*
    Buffers the data as an array in ../data/bufferData
    @params accounts - account info, assumed structure is in App.js
    @params bufferSize - sets the max buffer size for the array

*/

function bufferData(accounts, bufferSize) {
    let BUFFER = bufferSize;

    async function userInfo(account, dictionary) {
        try {
            const response = await getUserByUsername(account);
            dictionary["account"] = response.data;
            return response.data.id;
        } catch (error) {
            console.log(error);
        }
    }

    async function postInfo(id, dictionary) {
        try {
            const response = await getTimeline(id, true, true);
            const recentPosts = response.data;
            // Select random post from timeline
            const randomRecentPost =
                recentPosts.data[
                    Math.floor(Math.random() * recentPosts.data.length)
                ];
            // Get full tweet object including media for the post
            dictionary["post"] = await tweetLookup(randomRecentPost.id);
            //dictionary["id"] = randomRecentPost.id;
            return;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        If data length is less than BUFFER, set buffer to the difference

        Then iterate BUFFER number of times, and add BUFFER amount of data
        into result and push to data array for buffering.
    */

    if (data.length < BUFFER) {
        BUFFER = BUFFER - data.length;
    }

    for (let i = 0; i < BUFFER; i++) {
        let result = {};
        const index = Math.floor(Math.random() * accounts.length);
        const randomAccount = accounts[index].username;
        //console.log(randomAccount);
        userInfo(randomAccount, result)
            .then((id) => postInfo(id, result))
            .then(() => {
                result["choices"] = setChoices(index, accounts);
                data.push(result);
            });
    }

    /* below is for debugging purposes */

    //console.log(data);
}

export default bufferData;
