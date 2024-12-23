import { HttpService } from '@nestjs/axios';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { lastValueFrom } from 'rxjs';
import * as admin from 'firebase-admin';
import { Inject } from '@nestjs/common';
import { WebsocketGateway } from 'src/websocket/websocket.gateway';

@Processor('scanQueue', {
  limiter: {
    max: 50,
    duration: 1000,
  },
})
export class TemplateConsumer extends WorkerHost {
  private canProcessQueue = false;
  private batchData = [];

  set toggleQueue(value: boolean) {
    this.canProcessQueue = value;
  }

  constructor(
    private readonly httpService: HttpService,
    @Inject('FIREBASE_APP') private readonly admin: admin.app.App,
    private readonly websocket: WebsocketGateway,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<void> {
    if (!this.canProcessQueue) return;
    let baseRef = this.admin.database().ref(`Template/box/${job.data.ID}`);

    try {
      const codeTemplate = job.data.link.split('https://discord.new/')[1];
      const response = await lastValueFrom(
        this.httpService.get(
          `https://discord.com/api/v9/guilds/templates/${codeTemplate}`,
        ),
      );

      await baseRef.update({ usageCount: response.data.usage_count });

      this.batchData.push({
        id: job.data.ID,
        name: response.data.name,
        usageCount: response.data.usage_count,
      });
      console.log('skanuje');

      console.log(this.batchData.length);

      this.websocket.server.emit('message', {
        title: response.data.name,
        id: job.data.ID,
        usage: response.data.usage_count,
        dateCreate: '23.12.2024',
      });
    } catch (err) {
      if (err.response?.status === 429) {
        throw new Error('Rate limit error');
      }

      if (err.response?.data.code === 10057) baseRef.remove();

      console.log(`X`, job.data.ID, job.data.dateCreate);
    }
  }
}
