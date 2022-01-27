import { CacheModule, Module, ValidationPipe } from '@nestjs/common';
import { SocketGateway } from "./socket.gateway";

@Module({
  providers: [SocketGateway]
})
export class SocketModule {}
