import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-my-burger-93688.firebaseio.com/'
})

export default instance;