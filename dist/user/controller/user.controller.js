"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../service/user-service/user.service");
const rxjs_1 = require("rxjs");
const creat_user_dto_1 = require("../model/dto/creat-user.dto");
const user_helper_service_1 = require("../service/user-helper/user-helper.service");
const login_user_dto_1 = require("../model/dto/login-user.dto");
const operators_1 = require("rxjs/operators");
const jwt_guards_1 = require("../../auth/guards/jwt.guards");
let UserController = class UserController {
    constructor(userService, userHelperService) {
        this.userService = userService;
        this.userHelperService = userHelperService;
    }
    create(createUserDto) {
        return this.userHelperService.createUserDtoToEntity(createUserDto).pipe((0, rxjs_1.switchMap)((user) => this.userService.create(user)));
    }
    findAll(page = 1, limit = 10) {
        limit = limit > 100 ? 100 : limit;
        return this.userService.findAll({ page, limit, route: 'http://localhost:3000/api/userS' });
    }
    login(loginUserDto) {
        return this.userHelperService.loginUserDtoToEntity(loginUserDto).pipe((0, rxjs_1.switchMap)((user) => this.userService.login(user).pipe((0, operators_1.map)((jwt) => {
            return {
                access_token: jwt,
                token_type: 'JWT',
                expires_in: 10000
            };
        }))));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [creat_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guards_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.loginUserDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        user_helper_service_1.UserHelperService])
], UserController);
//# sourceMappingURL=user.controller.js.map