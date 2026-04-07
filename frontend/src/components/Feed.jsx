import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/FeedSlice";
import UserCard from "./UserCard";
import { BASE_URL, API_URLS } from "../utils/constants";
import { useEffect } from "react";

const Feed = () => {
    const dispatch = useDispatch();
    const feed = useSelector((state) => state.feed);

    const getFeed = async () => {
        if (feed) {
            return;
        }
        try {
            const res = await axios.get(`${BASE_URL}${API_URLS.FEED}`, {
                withCredentials: true,
            });
            console.log("Fetched feed:", res.data);
            dispatch(addFeed(res.data));
        } catch (error) {
            console.log("Error fetching feed:", error);
        }
    };
    useEffect(() => {
        getFeed();
    }, []);

    return (
        <div>
            {feed.map((item) => (
                <UserCard key={item.id} user={item} />
            ))}
        </div>
    );
};

export default Feed;
