import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function DefaulLayout() {
    const { user, token, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    const onLogout = (e) => {
        e.preventDefault();

        axiosClient.post('/logout').then(({data}) => {
            setUser({});
            setToken(null)
            console.log(data)
        })
    };

    function showPopup (message) {
        console.log('click')
        setPopup(true);
        setPopupmessage(message);

        setTimeout(() => {
            setPopup(false);
            setPopupmessage(null);
        }, 2000);
    }

    // Unfortunately, I'm forced to move this useState here, otherwise, error thrown
    const [popupMessage, setPopupmessage] = useState(null);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        axiosClient.get('/user').then(({data}) => {
            setUser(data);
        })
    }, []);

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users"> Users </Link>
            </aside>

            <div className="content">
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a className="btn-logout" onClick={onLogout} href="#">
                            Logout
                        </a>
                    </div>
                </header>

                <main>
                    {popup && <div className="popup"> {popupMessage} </div>}
                    <Outlet context={showPopup}/>
                </main>
            </div>
        </div>
    );
}

export default DefaulLayout;
