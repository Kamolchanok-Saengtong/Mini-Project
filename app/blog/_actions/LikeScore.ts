"use server"
 
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
 
export default async function likePost(id: number) {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                likeScore: {
                    increment: 1,
                },
            },
        });
        console.log('Post liked:', updatedPost);
        revalidatePath("/blog");
    } catch (error) {
        console.error('Error liking post:', error);
    }
}