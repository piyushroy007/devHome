import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
    const user = useSelector((state) => state.user);
    console.log("User in NavBar:", user);

    return (
        <div className="navbar bg-base-300 px-5">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">devHome</a>
            </div>
            <div className="flex-none gap-2">
                {user && (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={
                                        user.photoUrl ||
                                        "https://static.vecteezy.com/system/resources/thumbnails/005/544/770/small/profile-icon-design-free-vector.jpg"
                                    }
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
