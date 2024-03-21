import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { EmailBackgroundService } from './email.background';

@Module({
  providers: [EmailService, EmailBackgroundService],
  imports: [
    BullModule.registerQueue({
      name: 'email'
    })
  ]
})
export class EmailModule { }
