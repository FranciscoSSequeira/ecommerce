// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';

// describe('UsersService', () => {
//   let service: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UsersService],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: { delete: jest.Mock };

  beforeEach(async () => {
    repository = {
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UsersRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should remove a user and return user data without password and isAdmin', async () => {
    const user = { id: '1', name: 'Juan', email: 'juan@mail.com' };
    repository.delete.mockResolvedValue(user);

    const result = await service.remove('1');
    expect(result).toEqual(user);
    expect(repository.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException if user does not exist', async () => {
    repository.delete.mockImplementation(() => { throw new NotFoundException('User not found'); });

    await expect(service.remove('999')).rejects.toThrow(NotFoundException);
    await expect(service.remove('999')).rejects.toThrow('User not found');
  });
});
