import { Request, Response } from "express";
export default class Controller {
    constructor(protected req: Request, protected res: Response) {
        return this;
    }
}
