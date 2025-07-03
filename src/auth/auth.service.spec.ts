// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';

// describe('AuthService', () => {
//   let service: AuthService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthService],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepository: { findByEmail: jest.Mock };
  let jwtService: { sign: jest.Mock };

  beforeEach(async () => {
    usersRepository = { findByEmail: jest.fn() };
    jwtService = { sign: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersRepository, useValue: usersRepository },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true); // Simula contraseña válida
  });

  it('should return a token for valid credentials', async () => {
    const user = { id: '1', email: 'juan@mail.com', password: 'hashed', isAdmin: false };
    usersRepository.findByEmail.mockResolvedValue(user);
    jwtService.sign.mockReturnValue('test-token');

    const result = await service.singIn('juan@mail.com', '1234');
    expect(result).toHaveProperty('token', 'test-token');
    expect(result).toHaveProperty('message', 'Login exitoso');
    expect(usersRepository.findByEmail).toHaveBeenCalledWith('juan@mail.com');
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  });
});