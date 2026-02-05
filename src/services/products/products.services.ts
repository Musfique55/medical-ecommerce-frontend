import { env } from "../../../env"

interface Params {
    category? : string
    minPrice? : string
    maxPrice? : string
    manufacturer ?: string
}

interface Options {
    cache ? : RequestCache
    revalidate ?: number
}

export const productServices = {
    getProducts : async (params ? : Params,options? : Options) => {
       try {
        const url = new URL(`${env.API_URL}/medicines`);
        if(params){
            Object.entries(params).forEach(([key,value]) => {
                if(value !== undefined || value !== "" || value !== null){
                    url.searchParams.append(key,value);
                }
            })
        }

        const config : RequestInit = {};

        if(options?.cache){
            config.cache = options.cache
        }

        if(options?.revalidate){
            config.next = {revalidate : options.revalidate}
        }

        const res = await fetch(url.toString(),config);
        const data = await res.json();

        return {data,error : null}
       } catch (error) {
            console.log(error);
            return {data : null,error : error}
       }
    },

    getProduct : async (id : string) => {
        try {
            const res = await fetch(`${env.API_URL}/medicines/${id}`);
            const data = await res.json();

            return {data : data,error : null}
        } catch (error) {
            return {data : null,error}
        }
    }
}