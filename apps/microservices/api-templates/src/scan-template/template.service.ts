import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { DataItem } from './interfaces/template.interface';
import { TemplateConsumer } from './template.queue.consumer';
import { PrismaService } from '@repo/shared';

@Injectable()
export class TemplateService {
  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
    @InjectQueue('scanQueue') private queue: Queue,
    private readonly template: TemplateConsumer,
    private readonly prisma: PrismaService,
  ) {}

  async createQueue(): Promise<string> {
    const templateSnapshot = await this.firebaseApp
      .database()
      .ref('Template/box/')
      .once('value');

    const array: DataItem[] = Object.values(templateSnapshot.val());

    const lengthQueue = await this.queue.getWaitingCount();

    if (lengthQueue == 0) {
      for (const element of array) {
        await this.queue.add('template-scan', element, { delay: 1500 });
      }
    }

    this.template.toggleQueue = true;

    const test = await this.prisma.user.create({
      data: {
        name: 'huj',
      },
    });

    console.log(test);

    return 'all items added to queuess';
  }
}