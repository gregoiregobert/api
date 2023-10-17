import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: any;
    handleConnection(): void;
    handleDisconnect(): void;
}
