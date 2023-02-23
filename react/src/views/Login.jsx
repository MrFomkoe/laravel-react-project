import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);



    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };

        setErrors({});
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                
                const response = error.response;
                
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({
                            message: response.data.message
                        });
                        
                    }
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title"> Log in to your account </h1>
                    {errors && <span className="alert">{errors.message}</span>}
                    <input  ref={emailRef} type="email" placeholder="Email" name="email" />
                    {errors && <span className="alert">{errors.email}</span>}
                    <input ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    {errors && <span className="alert">{errors.password}</span>}
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered? <Link to="/signup" >Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
