import axios from "axios"
import type { UserType } from "./types/AppContext.type";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fullUrl = `${BASE_URL}?key=${API_KEY}`;

export default fullUrl;

export class API {

    static getPosts = async () => {
        const { data } = await axios.post<UserType>("")
        return data;
    }
}