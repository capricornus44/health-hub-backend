import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  async sendVerificationEmail(email: string, token: string) {
    this.logger.log(
      `Sending verification email to ${email} with token: ${token}`,
    );
  }
}
