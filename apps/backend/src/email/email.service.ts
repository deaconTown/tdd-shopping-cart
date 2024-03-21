import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendWelcomeEmail(email: string): Promise<void> {
        this.logger.log('entered  sendWelcomeEmail method')

        this.logger.log('sending email');

        await new Promise(resolve => {
            setTimeout(() => {
                this.logger.log('email', email) 
            }, 2000)
        })

        this.logger.log('exiting  sendWelcomeEmail method')
    }
}
