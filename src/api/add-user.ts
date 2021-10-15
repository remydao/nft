import express from "express";
import { addUser } from "../controllers/user-controller";

const router = express.Router();

// Add a task to the database
router.post('/user', addUser);

module.exports = router;