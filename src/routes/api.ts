import { Router, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { body } from "express-validator";

import validateValidation from "../middleware/validateValidation";
import PingController from "../http/controllers/PingController";
import SubscriptionController from "../http/controllers/SubscriptionController";
const router = Router();

router.use(bodyParser.json());

router.get("/api/v1/ping", (req: Request, res: Response) => {
    new PingController(req, res).ping();
});

// Subscriptions
router.get("/api/v1/subscription", (req: Request, res: Response) => {
    new SubscriptionController(req, res).index();
});

router.post(
    "/api/v1/subscription",
    [body("subject").isString()],
    validateValidation,
    (req: Request, res: Response) => {
        new SubscriptionController(req, res).create();
    }
);

router.get("/api/v1/subscription/:id", (req: Request, res: Response) => {
    new SubscriptionController(req, res).read();
});

router.put(
    "/api/v1/subscription/:id",
    [body("subject").isString()],
    validateValidation,
    (req: Request, res: Response) => {
        new SubscriptionController(req, res).update();
    }
);

router.delete(
    "/api/v1/subscription/:id",
    (req: Request, res: Response) => {
        new SubscriptionController(req, res).delete();
    }
);

export default router;
