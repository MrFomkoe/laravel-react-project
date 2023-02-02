import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import axiosClient from "../axios-client";

function UserForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const showPopup = useOutletContext();

    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            getUser();
        }, []);
    }

    function getUser() {
        setLoading(true);
        axiosClient
            .get(`/users/${id}`)
            .then(({ data }) => {
                setLoading(false);
                setUser(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function onSubmit(e) {
        e.preventDefault();
        if (user.id) {
            axiosClient
                .patch(`/users/${user.id}`, user)
                .then(() => {
                    showPopup("User has been updated");
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    showPopup("New user has been created");
                    navigate("/users");
                })
                .catch((error) => {
                    const response = error.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    }

    return (
        <div>
            {user.id ? <h1>Update User: {user.name}</h1> : <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading ? (
                    <div className="loader"></div>
                ) : (
                    <form onSubmit={onSubmit} action="">
                        <input
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            value={user.name}
                            type="text"
                            placeholder="Name"
                        />
                        {errors && <span className="alert">{errors.name}</span>}
                        <input
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            value={user.email}
                            type="email"
                            placeholder="Email"
                        />
                        {errors && (
                            <span className="alert">{errors.email}</span>
                        )}
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="text"
                            placeholder="Password"
                        />
                        {errors && (
                            <span className="alert">{errors.password}</span>
                        )}
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="text"
                            placeholder="Password Confirmation"
                        />
                        <button type="submit" className="btn">
                            Save
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default UserForm;
