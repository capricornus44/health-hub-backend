import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';
import * as argon2 from 'argon2';
import { EmailService } from './email.service';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, registerDto.email));

    if (existingUser.length > 0) {
      throw new BadRequestException('Email already exists');
    }

    const passwordHash = await argon2.hash(registerDto.password);
    const verificationToken = randomBytes(32).toString('hex');

    const [user] = await this.db
      .insert(schema.users)
      .values({
        name: registerDto.name,
        surname: registerDto.surname,
        dob: registerDto.dob,
        street: registerDto.street,
        city: registerDto.city,
        house: registerDto.house,
        state: registerDto.state,
        apartment: registerDto.apartment,
        zip: registerDto.zip,
        phone: registerDto.phone,
        gender: registerDto.gender,
        citizenship: registerDto.citizenship,
        email: registerDto.email,
        passwordHash,
        verificationToken,
      })
      .returning();

    await this.emailService.sendVerificationEmail(
      user.email,
      verificationToken,
    );

    const {
      passwordHash: password,
      verificationToken: token,
      ...result
    } = user;

    return {
      message: 'Please check your email to verify your account',
      data: result,
    };
  }

  async verifyEmail(token: string) {
    const trimmedToken = token?.trim();

    if (!trimmedToken) {
      throw new BadRequestException('Verification token is required');
    }

    const [user] = await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.verificationToken, trimmedToken));

    if (!user) {
      throw new NotFoundException('Invalid or expired verification token');
    }

    if (user.isVerified) {
      throw new BadRequestException('Email is already verified');
    }

    await this.db
      .update(schema.users)
      .set({ isVerified: true, verificationToken: null })
      .where(eq(schema.users.id, user.id));

    return {
      message:
        'Email verified successfully. Please sign in with your login and password',
    };
  }
}
