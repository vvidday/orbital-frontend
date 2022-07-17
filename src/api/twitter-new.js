import axios from "axios";

const BASE =
    "http://orbitalserver-env.eba-8dpksavz.us-west-2.elasticbeanstalk.com/";

export async function getUserByUsernameNew(username) {
    try {
        const data = await axios.get(BASE + "user", {
            params: {
                username: username,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getTimelineNew(userid) {
    try {
        const params = { id: userid };
        const data = await axios.get(BASE + "tweets", {
            params: params,
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
