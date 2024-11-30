"use client"
import { useState } from "react";
import { style } from "../constants/style";
 
export default function LikeButton({ id, likePost, initialLikes }: { id: number, likePost: Function, initialLikes: number }) {
    const [likeScore, setLikeScore] = useState(initialLikes);
 
    const handleLike = async () => {
        await likePost(id);
        setLikeScore((prev) => prev + 1);
    };
 
    return (
        <button className={` ${style} border-0 absolute mt-[30px] top-28 right-5`} onClick={handleLike}>
            like | {likeScore}
        </button>
    );
}
 