import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/FeedSlice";
import UserCard from "./UserCard";
import { BASE_URL, API_URLS } from "../utils/constants";
import { useEffect } from "react";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        if (feed) {
            return;
        }
        try {
            const res = await axios.get(`${BASE_URL}${API_URLS.FEED}`, {
                withCredentials: true,
            });
            dispatch(addFeed(res?.data?.userList));
            console.log("Fetched feed:", res?.data?.userList);
        } catch (error) {
            console.log("Error fetching feed:", error);
        }
    };
    useEffect(() => {
        getFeed();
    }, []);

    if (feed?.length <= 0)
        return (
            <h1 className="flex justify-center my-10">No new users founds!</h1>
        );

    return (
        feed && (
            <div className="flex justify-center my-10">
                <UserCard user={feed[0]} />
            </div>
        )
    );
};

export default Feed;
