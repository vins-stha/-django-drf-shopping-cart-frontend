import {useState, createContext, useContext, useEffect} from 'react';
import {useCookies} from "react-cookie";

const AuthContext = createContext(null)

export const  AuthProvider =  ({children}) => {

    const [user,setUser] = useState(null );
    const [cookies,setCookies] = useCookies();

    useEffect(()=>{
        console.log('cookies',cookies)
    },[])

    // const [userLoggedIn,setUserLoggeIn] =  useState()//cookies.is_admin === "true"? true : false)
    let userLoggedIn;
    console.log('userLoggedIn AUTH',userLoggedIn, 'cookies.is_admin', cookies.is_admin)
    if (cookies.is_admin)
        userLoggedIn = true
    else
        userLoggedIn = false

    let loggedIn = ()=>{
        userLoggedIn = true

    };
    let loggedOut = ()=>{

        userLoggedIn = false

    };

    return (<AuthContext.Provider value={{userLoggedIn,loggedIn, loggedOut}}>
        {children}

    </AuthContext.Provider>)
};

export  const useAuth = () =>{
    return useContext(AuthContext);
};