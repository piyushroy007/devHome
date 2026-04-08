import { DEFAULT_PHOTOURL } from "../utils/constants";

const UserCard = ({ user }) => {
    console.log("Rendering UserCard with user:", user);
    return (
        <div className="card bg-gray-400 w-96 shadow-sm">
            <figure className="px-10 pt-10 size-54 flex justify-center items-center rounded-full">
                <img
                    src={user?.photoUrl || DEFAULT_PHOTOURL}
                    alt={user?.firstname}
                    className="w-full h-full object-cover rounded-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {String(user?.firstname).toUpperCase()}{" "}
                    {String(user?.lastname).toUpperCase()}
                </h2>
                <p className="card-text">
                    {user?.age} years old, {user?.gender}
                </p>
                <p className="card-text">{user?.about}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Connect</button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
