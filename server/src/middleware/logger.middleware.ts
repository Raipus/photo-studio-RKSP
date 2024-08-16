import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            if (res.statusCode >= 400) {
                console.log('[ERROR] Ошибка: ' + res.statusCode.toString() + '; Сообщение: ' + res.statusMessage.toString() + '; Метод: ' + req.method.toString() + '; Запрос: ' + req.originalUrl.toString());
            }
            else {
                console.log('[LOG] Статус: ' + res.statusCode.toString() + '; Сообщение: ' + res.statusMessage.toString() + '; Метод: ' + req.method.toString() + '; Запрос: ' + req.originalUrl.toString());
            }
        })
        next();
    }
}