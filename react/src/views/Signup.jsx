import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setToken(data.token);
                setUser(data.user);
            })
            .catch((error) => {
                const response = error.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title"> Sign up </h1>
                    <input
                        ref={nameRef}
                        type="text"
                        placeholder="Full name"
                        name="name"
                    />

                    {errors && <span className="alert">{errors.name}</span>}
                    <input
                        ref={emailRef}
                        type="email"
                        placeholder="Email address"
                        name="email"
                    />
                    {errors && <span className="alert">{errors.email}</span>}
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    {errors && <span className="alert">{errors.password}</span>}
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        name="password_confirmation"
                        placeholder="Password Cofirmation"
                    />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Registered? <Link to="/login"> Login </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
