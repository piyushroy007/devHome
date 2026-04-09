import { DEFAULT_PHOTOURL1 } from "../utils/constants";

const UserCard = ({ user }) => {
    return (
        <div className="card bg-base-300 w-96 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-content/10">
            <figure className="relative group">
                <img
                    src={user?.photourl || DEFAULT_PHOTOURL1}
                    alt={`${user?.firstname} ${user?.lastname}`}
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <div className="badge badge-secondary font-semibold">
                        {user?.gender}
                    </div>
                </div>
            </figure>
            <div className="card-body gap-3">
                <div className="flex justify-between">
                    <h2 className="card-title text-2xl font-bold">
                        {String(user?.firstname).toUpperCase()}{" "}
                        {String(user?.lastname).toUpperCase()}
                    </h2>
                    {user?.age && (
                        <span className="text-xl font-medium opacity-70">
                            {user?.age}
                        </span>
                    )}
                </div>

                <div className="h-auto overflow-hidden">
                    <p className="text-base-content/80 text-sm line-clamp-3">
                        {user?.about || "No bio available."}
                    </p>
                </div>

                {user?.skill && user.skill.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                        {user.skill.slice(0, 3).map((s, i) => (
                            <span
                                key={i}
                                className="badge badge-outline badge-sm">
                                {s}
                            </span>
                        ))}
                        {user.skill.length > 3 && (
                            <span className="text-xs opacity-50 ml-1">
                                +{user.skill.length - 3} more
                            </span>
                        )}
                    </div>
                )}

                <div className="card-actions justify-center mt-4 gap-4">
                    <button className="btn btn-outline btn-error flex-1 hover:scale-105 transition-transform">
                        Ignore
                    </button>
                    <button className="btn btn-primary flex-1 hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                        Connect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
