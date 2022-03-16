import React,{useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom'
import {useCookies} from 'react-cookie';
import {useAuth} from "../services/Auth";


export const AdminLogin = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const[cookies,setCookie] = useCookies();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/admin/dashboard';

    const auth = useAuth();

    useEffect(()=>{
        console.log('from login page isloggedin', auth.userLoggedIn)
    },[]);

    const handleFormSubmit = async (e) => {

        e.preventDefault();
        let body = {
            username: username,
            password: password
        };
        try {

            let result = await fetch("http://localhost:8000/api/v1/token/", {
                'method': 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: body.username, password: body.password})
            });

            let response = await result.json();

            setMessage({
                status: result.status,
                message: result.status === 200 ? 'Login Successful!' : response.message
            });

            console.log("ACCCCCC", cookies.access_token)

            if (cookies.access_token === undefined)
                setCookie('access_token', response.access)
            if (cookies.refresh_token === undefined)
                setCookie('refresh_token', response.refresh)
            if (cookies.is_admin === undefined)
                setCookie('is_admin', true)

            auth.loggedIn(true)

            navigate("/admin/dashboard/")

            // navigate(from, {replace: true})


        } catch (error) {
            console.log('Something went wrong', error);
        }

    };

    return (
        <>
            <div className="form-container">
            <div className="modal-dialog modal-login">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Admin Login</h4>
                    </div>
                    <div className="modal-body">
                        <form  method="post" onSubmit={e => handleFormSubmit(e)}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Username"
                                       onChange={e=>setUsername(e.target.value)} required="required"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password"
                                       onChange={e=>setPassword(e.target.value)}  placeholder="Password" required="required"/>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-lg btn-block login-btn" onSubmit={e=>handleFormSubmit}>Login
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <a href="#">Forgot Password?</a>
                    </div>
                </div>
            </div>
            </div>
        </>
    )


};