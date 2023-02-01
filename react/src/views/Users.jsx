import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axiosClient from "../axios-client";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const showPopup = useOutletContext();

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function onDelete(user) {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        } else {
            axiosClient.delete(`/users/${user.id}`).then(() => {
                showPopup('User has been deleted');
                getUsers();
            });
        }
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">
                    Add new
                </Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            <tr>
                                <td colSpan={5} className='loader-container'>
                                    <div className="loader"></div>
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {users.map((user) => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.created_at}</td>
                                        <td>
                                            <Link
                                                className="btn-edit"
                                                to={`/users/${user.id}`}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={(e) => onDelete(user)}
                                                className="btn-delete"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Users;
