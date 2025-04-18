import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateApiKeysService } from './services/create.service';
import { CreateApiDto } from './dto/create-api.dto';
import { UpdateApiDto } from './dto/update-api.dto';
import { UpdateService } from './services/update.service';
import { TestNotificationDto } from './dto/test-notification';
import { NotificationTestService } from './services/test-notification.service';

@Controller('/api/internal/api-keys/')
export class ApiKeysController {
  constructor(
    private service: CreateApiKeysService,
    private serviceUpdate: UpdateService,
    private test: NotificationTestService,
  ) {}

  @Post('create')
  @HttpCode(200)
  createApi(@Body() createApiBody: CreateApiDto): Promise<object> {
    return this.service.createApi(createApiBody);
  }

  @Post('update')
  @HttpCode(200)
  updateApi(@Body() updateApiBody: UpdateApiDto): Promise<string> {
    return this.serviceUpdate.updateApi(updateApiBody);
  }

  @Post('/notification/test')
  @HttpCode(200)
  async testNotification(
    @Body() testApiBody: TestNotificationDto,
  ): Promise<void> {
    await this.test.testNotification(testApiBody);
  }
}
