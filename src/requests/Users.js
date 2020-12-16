import JPClient from "../clients/JPClient";


const post_endpoint = "/users"

const getUsers = () => {
    return JPClient.get(post_endpoint);
};

export default getUsers;