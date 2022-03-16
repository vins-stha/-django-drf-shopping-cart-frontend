import {Navigate, useLocation} from 'react-router-dom'
import {useAuth} from "../services/Auth";


export const ProtectedRoute = ({children}) => {

    const auth = useAuth();
    const location = useLocation();

    console.log('is loggedin ', auth.userLoggedIn)

    if (!auth.userLoggedIn)
        return <Navigate to={"/admin/login"} state={{path: location.pathname}}/>

    return children


};


