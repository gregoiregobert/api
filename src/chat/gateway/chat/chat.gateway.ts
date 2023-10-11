import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({cors: { origin: ['https://hoppscotch.io', 'http://localhost:3000', 'http://localhost:4200']}})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';

  }

  handleConnection() {
	console.log('on Connect');
	
  }


  handleDisconnect() {
	console.log('on Disconnect');
	
  }
}
