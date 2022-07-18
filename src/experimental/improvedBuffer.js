import { data } from "./data/improvedBuffer";
import { getUserByUsername } from "../api/twitter";
import { getTimeline } from "../api/twitter";
import { setChoices } from "../logic/setChoices";
import { shuffleArray } from "../algorithms/shuffle";
/*
    Buffers the data as an array in ../data/bufferData
    @params accounts - account info, assumed structure is in App.js
    @params bufferSize - sets the max buffer size for the array

*/

function bufferDataV2(accounts, bufferSize) {
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

    async function postInfo(id, dictionary, index) {
        try {
            const response = await getTimeline(id, true, true);
            const recentPosts = response.data.data;
            for (let i = 0; i < recentPosts.length; i++) {
                const resultCopy = {account:{...dictionary["account"]}};
                resultCopy["choices"] = setChoices(index, accounts);
                resultCopy["id"] = recentPosts[i].id;
                data.push(resultCopy);
            }
            return;
        } catch (error) {
            console.log(error);
        }
    }

    for (let i = 0; i < accounts.length; i++) {
        let result = {};
        const accountChosen = accounts[i].username;
        //console.log(randomAccount);
        userInfo(accountChosen, result)
            .then((id) => postInfo(id, result, i))
            .then(() => shuffleArray(data));
        console.log(data);
    }

    /* below is for debugging purposes */
    console.log("testData");
    console.log(data);
    console.log("--------");
}

export default bufferDataV2;
