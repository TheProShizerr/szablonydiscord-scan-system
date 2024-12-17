import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TemplateModule } from './templates/template.module';
import { BullModule } from '@nestjs/bullmq';
import { UserModule } from './users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ cache: true }),
    TemplateModule,
    UserModule,
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [WebsocketGateway],
})
export class AppModule {}
