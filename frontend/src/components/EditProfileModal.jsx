import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL, API_URLS } from "../utils/constants";

const EditProfileModal = ({ user, onClose, triggerToast }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        photourl: user?.photourl || "",
        about: user?.about || "",
        age: user?.age || "",
        gender: user?.gender || "male",
        skill: user?.skill?.join(", ") || "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const skillsArray = formData.skill
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s !== "");

            const dataToSubmit = {
                ...formData,
                skill: skillsArray,
                age: Number(formData.age),
            };
            console.log("dataToSubmit", dataToSubmit);
            const response = await axios.put(
                BASE_URL + API_URLS.USER_EDIT,
                dataToSubmit,
                { withCredentials: true },
            );

            if (response.status === 200) {
                dispatch(addUser(response.data.user));
                triggerToast();
                onClose();
            }
        } catch (err) {
            setError(err.response?.data?.error || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-2xl bg-base-100 border border-base-content/10">
                <h3 className="font-bold text-2xl mb-6">Edit Profile</h3>
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">
                                First Name
                            </span>
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Last Name
                            </span>
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Age
                            </span>
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Gender
                            </span>
                        </label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="select select-bordered w-full">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Photo URL
                            </span>
                        </label>
                        <input
                            type="text"
                            name="photourl"
                            value={formData.photourl}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">
                                Skills (comma separated)
                            </span>
                        </label>
                        <input
                            type="text"
                            name="skill"
                            value={formData.skill}
                            onChange={handleChange}
                            placeholder="React, Node, MongoDB..."
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="form-control w-full md:col-span-2">
                        <label className="label">
                            <span className="label-text font-semibold">
                                About
                            </span>
                        </label>
                        <textarea
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            className="textarea textarea-bordered h-24 w-full"
                            placeholder="Tell us about yourself..."></textarea>
                    </div>
                    {error && (
                        <div className="alert alert-error mb-4 md:col-span-2">
                            <span>{error}</span>
                        </div>
                    )}
                    <div className="modal-action md:col-span-2">
                        <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={onClose}
                            disabled={loading}>
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary px-8"
                            disabled={loading}>
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
