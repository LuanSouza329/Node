import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export class PostController {
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany({
                include: { author: true }
            });
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching posts.' });
        }
    }
}