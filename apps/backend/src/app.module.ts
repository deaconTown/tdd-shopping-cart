import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [EmailModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
