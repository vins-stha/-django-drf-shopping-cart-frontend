import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom'


export const AdminLogin = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();
    const handleFormSubmit = async (e) => {

        e.preventDefault();
        let body = {
            username: username,
            password: password
        };
        try {

            let result = await fetch("http://localhost:8000/api/v1/token/", {
                'method':'POST',
                headers: {
                    'Content-Type':  'application/json'
                },
                body: JSON.stringify({username:body.username, password:body.password})
            });

           let response = await result.json();

            setMessage({
                status: result.status,
                message: result.status === 200 ? 'Login Successful!' : response.message
            });
            response.access ? localStorage.setItem('access_token',response.access): localStorage.setItem('access_token','');
            response.refresh ? localStorage.setItem('refresh_token',response.refresh):localStorage.setItem('refresh_token','');

            response.access !== undefined ? navigate('/admin/dashboard'): navigate('/');

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