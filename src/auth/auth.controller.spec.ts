import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const mockAuthService = {
      signUp: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UsersService, useValue: {} },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should register a new user', async () => {
    const dto: CreateUserDto = {
      name: 'Juan',
      email: 'juan@mail.com',
      password: '1234',
      confirmPassword: '1234',
      address: '123 Main St',
      phone: 1234567890,
      country: 'CountryName',
      city: 'CityName'
    };
    const expectedResult = { ...dto, id: '1' };

    jest.spyOn(authService, 'signUp').mockResolvedValue(expectedResult as any);

    const result = await controller.signUp(dto);
    expect(result).toEqual(expectedResult);
    expect(authService.signUp).toHaveBeenCalledWith(dto);
  });
});

