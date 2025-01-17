import { Module } from '@nestjs/common';
import { QueueModule } from './internal-api/queue/queue.module';
import { ListenerModule } from './internal-api/listener/listener.module';
import { TemplateModule } from './templates/templates.module';
import { ConfigModule } from '@nestjs/config';
import { ApiKeysModule } from './internal-api/api-keys/api-keys.module';
import { PublicModule } from './public-api/public.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({ isGlobal: true }),
    PublicModule,
    // QueueModule,
    ListenerModule,
    TemplateModule,
    ApiKeysModule,
  ],
})
export class AppModule {}
