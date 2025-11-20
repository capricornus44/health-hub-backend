import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { EmailService } from '../email.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'DRIZZLE',
          useValue: {
            select: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendVerificationEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
