import { cookies } from "next/headers"
import { env } from "../../../env"

export const orderServices = {
    getCustomerOrders : async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.API_URL}/orders`,{
                headers : {
                    "content-type" : "application/json",
                    Cookie : cookieStore.toString()
                }
            });
            const data = await res.json();
            return{data : data.data,error : null}
        } catch (error : any) {
            console.log(error);
            return {data : null,error : error.message}
        }
    },
    getDeliveredOrders : async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.API_URL}/orders/delivered`,{
                headers : {
                    "content-type" : "application/json",
                    Cookie : cookieStore.toString()
                }
            });
            const data = await res.json();
            return{data : data.data,error : null}
        } catch (error : any) {
            console.log(error);
            return {data : null,error : error.message}
        }
    },
    getActiveShippedOrders : async () => {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${env.API_URL}/orders/active-shipped`,{
                headers : {
                    "content-type" : "application/json",
                    Cookie : cookieStore.toString()
                }
            });
            const data = await res.json();
            return{data : data.data,error : null}
        } catch (error : any) {
            console.log(error);
            return {data : null,error : error.message}
        }
    }
}