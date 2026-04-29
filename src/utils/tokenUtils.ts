"use server"

import { JwtPayload } from "jsonwebtoken";
import { setCookie } from "./cookieUtils"
import { jwtUtils } from "./jwtUtils";


export const setToken = async (key : string,value : string,maxAge : number) => {
    await setCookie(key,value,maxAge);
}

export const getRemainingSeconds = async (token : string) => {
    try {
        const payload = jwtUtils.decodeToken(token) as JwtPayload;
        if(!payload.exp){
            return 0;
        }

        const remaining = payload.exp as number - Math.floor(Date.now() / 1000);

        return remaining > 0 ? remaining : 0 
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const isExpiringSoon = async (token : string,threshold=300) => {
    const remaining = await getRemainingSeconds(token);

    return remaining > 0 && remaining <= threshold;
}