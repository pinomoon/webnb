import * as Cookies from 'js-cookie';

export const setSessionCookie =(session)=>{
    Cookies.remove("session");
    Cookies.set("session", session,{expires:14});
};
export const getSessionCookie=()=>{
    const sessionCookie=Cookies.get("session");
    if(sessionCookie===undefined){
        return{};
    }
    else{
        return JSON.parse(sessionCookie);
    }
};
export const setUserCookie=(user)=>{
    Cookies.remove("user");
    Cookies.set("user",user,{expires:14});
}
export const getUserCookie=()=>{
    const userCookie=Cookies.get("user");
    if(userCookie===undefined){
        return{};
    }
    else{
        return JSON.parse(userCookie);
    }
};