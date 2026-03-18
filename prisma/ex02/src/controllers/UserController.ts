import { prisma } from '../lib/prisma';
import { Request, Response } from 'express';

export class UserController {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                include: { posts: true }
            });

            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching users.' });
        }
    }

    async getUserById(req: Request, res: Response) {

        const id: number = Number(req.params.id);

        try {
            const user = await prisma.user.findUnique({
                where: { id },
                include: { posts: true }
            });

            if (!user) {
                res.status(404).json({ error: 'User not found.' });
                return;
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while fetching the user.' });
        }
    }

    async createUser(req: Request, res: Response) {
        const { name, email } = req.body;

        try {
            const newUser = await prisma.user.create({
                data: { name, email }
            });

            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while creating the user.' });
        }
    }

    async updateUser(req: Request, res: Response) {
        const id: number = Number(req.params.id);

        const { name, email } = req.body;

        try {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: { name, email }
            });
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the user.' });
        }
    }

    async updateName(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const { name } = req.body;

        try {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: { name }
            });
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the user name.' });
        }
    }

    async updateEmail(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        const { email } = req.body;

        try {
            const updatedUser = await prisma.user.update({
                where: { id },
                data: { email }
            });
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while updating the user email.' });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const id: number = Number(req.params.id);
        try {
            const deletedUser = await prisma.user.delete({
                where: { id }
            });
            return res.status(200).json(deletedUser);
        } catch (error) {
            return res.status(500).json({ error: 'An error occurred while deleting the user.' });
        }
    }
}