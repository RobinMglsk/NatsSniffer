import { Router, Request, Response, NextFunction } from "express";

import PingController from "../http/controllers/PingController";
const router = Router();

router.get("/api/v1/ping", (req: Request, res: Response) => {
    new PingController(req, res).ping();
});


export default router;