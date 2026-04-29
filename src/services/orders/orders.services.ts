import { cookies } from "next/headers"
import { env } from "../../../env"
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

async function getCookieData() : Promise<ReadonlyRequestCookies> {
  return new Promise((resolve) =>
    setTimeout(async () => {
      // cookies will be called outside of the async context, causing a build-time error
      const cookieStore = await cookies()
      resolve(cookieStore)
    }, 1000)
  )
}



export const orderServices = {
    getCustomerOrders : async () => {
        try {
            const cookieData = await getCookieData();
            const res = await fetch(`${env.API_URL}/orders`,{
                headers : {
                    "content-type" : "application/json",
                    Cookie : cookieData.toString()
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
            const cookieData = await getCookieData();
            const res = await fetch(`${env.API_URL}/orders/delivered`,{
                headers : {
                    "content-type" : "application/json",
                    Cookie : cookieData.toString()
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
            const cookieData = await getCookieData();
            const res = await fetch(`${env.API_URL}/orders/active-shipped`,{
                headers : {
                    "content-type" : "application/json",
                    Cookie : cookieData.toString()
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