import { Router } from "express";
import { PostController } from "../controllers/PostController";

const router = Router();
const postController = new PostController();

router.get('/posts', postController.getAllPosts);

export { router };