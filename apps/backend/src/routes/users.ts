import express, { Request, Response } from "express";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const { username, phonenumber, email, password } = req.body;
});

export default router;
