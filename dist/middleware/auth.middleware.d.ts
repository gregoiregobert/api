import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { AuthService } from "src/auth/service/auth.service";
import { UserI } from "src/user/model/user.interface";
import { UserService } from "src/user/service/user-service/user.service";
export interface RequestModel extends Request {
    user: UserI;
}
export declare class AuthMiddleware implements NestMiddleware {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    use(req: RequestModel, res: Response, next: NextFunction): Promise<void>;
}
