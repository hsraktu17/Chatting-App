import express from "express";
import userAuth from "./users";

const router = express.Router();

router.use("/user", userAuth);

export default router;
