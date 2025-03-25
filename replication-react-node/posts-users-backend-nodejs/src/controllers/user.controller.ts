import { Request, Response, Router } from "express";
import { UserService } from "../services/user.service";

export const createUserController = (userService: UserService) => {
    const router = Router();

    // Get all users
    router.get("/", (req: Request, res: Response) => {
        const users = userService.getAllUsers();
        res.json(users);
    });

    // Search users by email
    router.get("/search", (req: Request, res: Response) => {
        const { email } = req.query;

        if (!email) {
            res.status(400).json({ message: "Email query parameter is required" });
        }

        const matchedUsers = userService.getAllUsers().filter((user) =>
            user.email.toLowerCase().includes((email as string).toLowerCase())
        );

        res.json(matchedUsers);
    });

    // Get user by ID
    router.get("/:id", (req: Request, res: Response) => {
        const user = userService.getUserById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });

    // Create a new user
    router.post("/", (req: Request, res: Response) => {
        try {
            const user = userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    });

    // Update user
    router.put("/:id", (req: Request, res: Response) => {
        const updatedUser = userService.updateUser(req.params.id, req.body);
        if (updatedUser) {
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });

    // Delete user
    router.delete("/:id", (req: Request, res: Response) => {
        const deleted = userService.deleteUser(req.params.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "User not found" });
        }
    });

    return router;
};
