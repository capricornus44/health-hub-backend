import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name);

    async sendVerificationEmail(email: string, token: string) {
        // Mock implementation
        this.logger.log(`Sending verification email to ${email} with token: ${token}`);
        // In a real implementation, this would use nodemailer or an external service
    }
}
