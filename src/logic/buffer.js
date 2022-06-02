import { data } from "../data/bufferData"; 
import { getUserByUsername } from "../api/twitter";
import { getTimeline } from "../api/twitter";
import { setChoices } from "../logic/setChoices";
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
            const randomRecentPost =
            recentPosts.data[
                Math.floor(Math.random() * recentPosts.data.length)
            ];
            dictionary["post"] = randomRecentPost.text;
            return randomRecentPost.text;
        } catch (error) {
            console.log(error);
        }
    }

    if (data.length < BUFFER) {
        BUFFER = BUFFER - data.length;
    }

    for (let i = 0; i < BUFFER; i++) {
        let result = {};
        const index = Math.floor(Math.random() * accounts.length);
        const randomAccount = accounts[index].username;
        console.log(randomAccount);
        userInfo(randomAccount, result)
            .then((id) => postInfo(id, result))
            .then(() => {
                result["choices"] = setChoices(index, accounts);
                data.push(result);
            });
    }
    console.log(data);
}

export default bufferData;