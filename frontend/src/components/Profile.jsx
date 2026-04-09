import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DEFAULT_PHOTOURL } from "../utils/constants";
import EditProfileModal from "./EditProfileModal";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="card lg:card-side bg-base-100 shadow-2xl overflow-hidden border border-base-content/10">
                    {/* Profile Image Section */}
                    <figure className="lg:w-1/3 relative bg-base-300 min-h-[400px]">
                        <img
                            src={user?.photourl || DEFAULT_PHOTOURL}
                            alt={`${user?.firstname} ${user?.lastname}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute p-4 text-white">
                            <h2 className="text-3xl font-bold">
                                {String(user?.firstname).toUpperCase()}{" "}
                                {String(user?.lastname).toUpperCase()}
                            </h2>
                            <p className="text-lg font-bold opacity-80">
                                {user?.gender}, {user?.age} yrs
                            </p>
                        </div>
                    </figure>

                    {/* Profile Info Section */}
                    <div className="card-body lg:w-2/3 p-8">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-base-content flex items-center gap-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-primary"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                                Profile Details
                            </h3>
                            <button
                                className="btn btn-primary btn-sm md:btn-md gap-2 shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                onClick={() => setIsEditModalOpen(true)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.707.707-2.828-2.828.707-.707zM11.36 6.172l-5.142 5.142-1.141 3.424 3.424-1.141 5.142-5.142-2.828-2.828z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-2">
                                    About
                                </h4>
                                <p className="text-base-content text-lg leading-relaxed italic bg-base-200/50 p-4 rounded-xl border border-base-content/5">
                                    {user?.about ||
                                        "Add a bio to let people know more about you."}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3">
                                    Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {user?.skill && user.skill.length > 0 ? (
                                        user.skill.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="badge badge-outline badge-lg p-4 font-medium hover:badge-primary transition-colors cursor-default">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-base-content/40 italic">
                                            No skills added yet.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-base-content/10">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50">
                                            Email Address
                                        </p>
                                        <p className="font-semibold">
                                            {user?.emailid}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50">
                                            Joined On
                                        </p>
                                        <p className="font-semibold">
                                            {new Date(
                                                user?.createdAt,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <EditProfileModal
                    user={user}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
        </div>
    );
};

export default Profile;
