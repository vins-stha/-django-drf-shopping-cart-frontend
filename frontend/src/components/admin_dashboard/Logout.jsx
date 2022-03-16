import {useCookies} from "react-cookie";
import {useEffect, useState} from "react";


export const Logout = () => {
    const[cookies,setCookie] = useCookies();
    const [auth,setAuth] = useState(false);


    useEffect(()=>{
        cookies?.is_admin === "true" ?  setAuth(true): setAuth(false);
        console.log('auth', auth)

    },[auth]);

}
