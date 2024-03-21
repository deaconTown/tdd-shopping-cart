import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('notification')
export class NotificationProcessor {

    private readonly logger = new Logger(NotificationProcessor.name);

    @Process()
    async sendNotification(job: Job<unknown>){
        this.logger.log('entered the sendNotification job ')
        const {data} = job;
        
        console.log('notification data', data)
        this.logger.log('exiting the sendNotification job ')
    }
}