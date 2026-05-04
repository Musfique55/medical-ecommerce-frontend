const authRoutes = ['/auth/login','/auth/register']

interface RoutesConfig {
  exact: string[];
  pattern: RegExp[];
}

export type Roles = 'ADMIN' | 'CUSTOMER' | 'SELLER';

export const isAuthRoute = (pathname : string) : boolean => {
    return authRoutes.includes(pathname);
}

const adminRoutes : RoutesConfig = {
    pattern : [/^\/admin\//],
    exact : []
}
const sellerRoutes : RoutesConfig = {
    pattern : [/^\/seller\//],
    exact : []
}

const customerRoutes : RoutesConfig = {
    pattern : [/^\/customer\//],
    exact : []
}

const isRouteMatched = (pathname : string,routes : RoutesConfig) => {
    if(routes.exact.includes(pathname)){
        return true;
    }

    return routes.pattern.some((pattern) => pattern.test(pathname))
}


export const routesOwner = (pathname : string) => {
    if(isRouteMatched(pathname,adminRoutes)){
        return "ADMIN"
    }

    if(isRouteMatched(pathname,sellerRoutes)){
        return "SELLER"
    }

    if(isRouteMatched(pathname,customerRoutes)){
        return "CUSTOMER"
    }

    return null;
}

export const getDefaultRoute = (role : Roles) => {
    console.log(role);
    if(role === "ADMIN"){
        return '/admin/dashboard'
    }
    if(role === "SELLER"){
        return '/seller/dashboard'
    }
    if(role === "CUSTOMER"){
        return '/customer/dashboard'
    }

    return '/'
}