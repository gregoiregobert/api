import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    handleMessage(client: any, payload: any): string;
    handleConnection(): void;
    handleDisconnect(): void;
}
