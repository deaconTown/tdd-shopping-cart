import { InjectQueue } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Queue } from "bull";

export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);
    
    constructor(@InjectQueue('notification') private notificationQueue: Queue){}

    async addNotification(data: unknown)
    {
        this.logger.log('entered the addNotification service method')
        await this.notificationQueue.add(data);
        this.logger.log('exiting the addNotification service method')
    }

    
}