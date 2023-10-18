import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/service/auth.service';
import { PageI } from 'src/chat/model/page.interface';
import { RoomI } from 'src/chat/model/room.interface';
import { RoomService } from 'src/chat/service/room-service/room/room.service';
import { UserService } from 'src/user/service/user-service/user.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private authService;
    private userService;
    private roomService;
    server: Server;
    constructor(authService: AuthService, userService: UserService, roomService: RoomService);
    handleConnection(socket: Socket): Promise<boolean | void>;
    handleDisconnect(socket: Socket): void;
    private disconnect;
    onCreateRoom(socket: Socket, room: RoomI): Promise<RoomI>;
    onPaginateRoom(socket: Socket, page: PageI): Promise<boolean>;
}
