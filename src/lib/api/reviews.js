import { serverFetch } from "../core/server";


export const getUserReviews = ()=>{
    return serverFetch("/api/user/review");
}