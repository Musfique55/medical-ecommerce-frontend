"use server"

import { Order } from "@/types";
import { env } from "../../env"
import { cookies } from "next/headers";

export const placeOrder = async (payload : Order) => {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${env.API_URL}/orders`,{
            method : "POST",
            headers : {
                "content-type" : "application/json",
                Cookie: cookieStore.toString()
            },
            body : JSON.stringify(payload)
        });


        
        if(!res.ok){
            throw new Error("Order Failed")
        }
        
        const data = await res.json();
        return data;

    } catch (error) {
        console.log(error);
    }
}