import axios from "axios";

const BASE = "https://orbital-api-vvidday.vercel.app/api/";
//const BASE = "https://orbital-api-guowei.vercel.app/api/";

export async function getUserByUsername(username) {
    try {
        const data = await axios.get(BASE + 'userbyusername',
            {
                params:{
                    username: username
                }
            });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getTimeline(userid, excReplies = false, excRetweets = false) {
    try {
        const params = {id: userid};
        if (excReplies && excRetweets) {
            params['exclude'] = "retweets,replies";
        } else if (excReplies) {
            params['exclude'] = "replies";
        } else if (excRetweets) {
            params['exclude'] = "retweets";
        }
        const data = await axios.get(BASE + 'usertimeline', 
        {
            params: params
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}