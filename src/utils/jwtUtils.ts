import jwt from "jsonwebtoken"
import { env } from "../../env"
import { JWTPayload } from "better-auth";

 const verifyToken = (token : string) =>{
    const verifiedToken = jwt.verify(token,env.JWT_SECRET);
    if(verifiedToken){
        return true;
    }

    return false;
}

 const decodeToken = (token : string) => {
    const decoded = jwt.decode(token) as JWTPayload;
    return decoded;
}

export const jwtUtils = {
    verifyToken,
    decodeToken
}