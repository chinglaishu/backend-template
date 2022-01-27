import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
 
@WebSocketGateway(3001, {cors: true})
export class SocketGateway {
  @WebSocketServer()
  server: Server;
 
  @SubscribeMessage('send_event')
  listenForMessages(@MessageBody() data: string) {
    console.log("get");
    console.log(data);
    this.server.sockets.emit('receive_event', data);
  }
}