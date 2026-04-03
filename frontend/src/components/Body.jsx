import { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL, API_URLS } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);
    console.log("User data in Body component:", userData);

    const fetchUser = async () => {
        try {
            const response = await axios.get(BASE_URL + API_URLS.PROFILE_VIEW, {
                withCredentials: true,
            });
            if (response.status === 200) {
                const data = response.data;
                console.log("User data:", data);
                dispatch(addUser(data)); // Dispatch the user data to the Redux store
            } else {
                console.error("Failed to fetch user data");
            }
        } catch (error) {
            if (error.status === 401) {
                navigate("/login");
            } else {
                console.error("Error fetching user data:", error);
            }
        }
    };

    useEffect(() => {
        if (!userData) {
            fetchUser();
        }
    }, [userData]);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};

export default Body;
