import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('[LOG] Request to ' + req.baseUrl.toString() + '; Server response status: ' + res.statusCode.toString());
        next();
    }
}