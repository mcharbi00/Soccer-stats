import { useState, useEffect } from 'react';


const HomePage = () => {
    const [user, setUser] = useState(null);

    const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const res = await fetch("http://localhost:5000/users/me", {
                headers: {
                    Authorization: `${token}`,
                },

            });
            console.log(res)
            if (res.status === 401) {
                setUser(null);
                return;
            }
            const data = await res.json();
            setUser(data);
        } catch (error) {
            console.log(error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Firstname: {user.firstname}</p>
                    <p>Email: {user.email}</p>

                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>

    );
};

export default HomePage;




