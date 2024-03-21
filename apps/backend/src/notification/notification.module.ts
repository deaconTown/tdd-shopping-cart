import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 5888
            }
        }),
        BullModule.registerQueue({
            name: 'notifications'
        })
    ]
})
export class NotificationModule {}
