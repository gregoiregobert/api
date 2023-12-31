"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatModule = void 0;
const common_1 = require("@nestjs/common");
const chat_gateway_1 = require("./gateway/chat/chat.gateway");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const room_service_1 = require("./service/room-service/room/room.service");
const typeorm_1 = require("@nestjs/typeorm");
const room_entity_1 = require("./model/room.entity");
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, user_module_1.UserModule, typeorm_1.TypeOrmModule.forFeature([room_entity_1.RoomEntity])],
        providers: [chat_gateway_1.ChatGateway, room_service_1.RoomService]
    })
], ChatModule);
//# sourceMappingURL=chat.module.js.map