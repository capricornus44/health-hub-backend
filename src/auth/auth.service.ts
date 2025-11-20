import { Inject, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../db/schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>,
  ) { }

  async register(registerDto: RegisterDto) {
    const [user] = await this.db.insert(schema.users).values({ name: registerDto.name }).returning()
    return user;
  }
}
