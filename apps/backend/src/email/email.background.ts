import { Logger } from "@nestjs/common";
import { EmailService } from "./email.service";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('email')
export class EmailBackgroundService {
    constructor(private readonly emailService: EmailService) { }

    private readonly logger = new Logger(EmailBackgroundService.name);


    async onModuleInit(): Promise<void> {
        await this.pollDatabaseForPendingEmails();
        await this.test();
    }

    async test() {
        this.logger.log('testing concurrency'); 
    }

    async pollDatabaseForPendingEmails() {
        this.logger.log('entered pollDatabaseForPendingEmails method');
        try {
            this.logger.log('fetchin emails from the database');

            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            fetch("http://localhost:4000/emails", {
                method: "GET",
                redirect: "follow"
            })
                .then((response) => response.text())
                .then((result) => {
                    console.log('result', result);

                    // const pendingEmails = JSON.stringify(result);
                    // this.logger.debug('pendingEmails', pendingEmails)
                    const parsedPendingEmails = JSON.parse(result);
                    this.logger.debug('parsedPendingEmails', parsedPendingEmails)

                    for (const i = 0 ; i < 1000000000000000; i+1)
                    {
                        for (const email of parsedPendingEmails) {
                            this.logger.debug('email to send', email)
                            this.sendWelcomeEmail(email);
                        }
                    }

                    


                })
                .catch((error) => console.error('error', error));

            // this.logger.log('data', JSON.stringify(response));


            // if (response.status === 200 || response.status === 201) {
            //     //    return JSON.parse(data.json())
            //     this.logger.log('emails', response.json());
            // }
        } catch (error) {
            this.logger.error('failed to retrieve emails. ', error.stack);
        }
        this.logger.log('exiting pollDatabaseForPendingEmails method');
    }

    @Process('sendWelcomeEmail')
    async sendWelcomeEmail(job: Job<{ test: string }>): Promise<void> {
        this.logger.log('entered sendWelcomeEmail method in background service ');
        this.logger.log('job ddsfs', job);
        const email = job['emailString'];


        try {
            await this.emailService.sendWelcomeEmail(email); 
        } catch (error) {
            this.logger.error('failed to send email. ', error.stack);
            throw error;
        }
    }


}