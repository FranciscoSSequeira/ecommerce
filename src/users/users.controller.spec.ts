// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';

import { before } from "node:test";
import { User } from "./entities/users.entity";
import { UsersController } from "./users.controller";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../auth/guards/auth.guard";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";

// describe('UsersController', () => {
//   let controller: UsersController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

describe('UsersController', () => {
  let controller: UsersController ;
  let mockUsersService;

  const mockUser : User[] = [
    {
      id: '1',
      name: 'John Doe',
      password: 'Pass!1234',
      email: 'john@mail.com',
      isAdmin: false,
      phone: 1234567890,
      address: '123 Main St',
      country: 'USA',
      city: 'New York',
      orders: [], 
    },
    {
      id: '2',
      name: 'Oscar',
      password: 'Pass!1234',
      email: 'oscar@mail.com',
      isAdmin: false,
      phone: 1234567890,
      address: '123 Main St',
      country: 'Venezuela',
      city: 'caracas',
      orders: [], 
    }
  ]
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser[0]),
            create: jest.fn().mockResolvedValue(mockUser[0]),
            update: jest.fn().mockResolvedValue(mockUser[0]),
            remove: jest.fn().mockResolvedValue(mockUser[0]),
          },
        },
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true), // Mocking the AuthGuard
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedToken'), // Mocking the JwtService
            verify: jest.fn().mockReturnValue({ userId: 'mock-user-id' }), // Mocking the verify method
          },
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    mockUsersService = module.get<UsersService>(UsersService);
})
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      // const result = []

      const result = await controller.getUsers(1, 5);
      expect(result).toEqual(mockUser);
      expect(mockUsersService.findAll).toHaveBeenCalled();
    });
  })

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await controller.findOne('1');// aca se puede probar con otro numero en lugar de '1'
      expect(result).toEqual(mockUser[0]);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });
  })
});
  // it('should return all users', async () => {
  //   const users = await controller.findAll();
  //   expect(users).toEqual(mockUser);
  //   expect(mockUsersService.findAll).toHaveBeenCalled();
  // });

  // it('should return a user by id', async () => {
  //   const user = await controller.findOne('1');
  //   expect(user).toEqual(mockUser[0]);
  //   expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
  // });

  // it('should create a new user', async () => {
  //   const newUser = await controller.create(mockUser[0]);
  //   expect(newUser).toEqual(mockUser[0]);
  //   expect(mockUsersService.create).toHaveBeenCalledWith(mockUser[0]);
  // });

  // it('should update a user', async () => {
  //   const updatedUser = await controller.update('1', mockUser[0]);
  //   expect(updatedUser).toEqual(mockUser[0]);
  //   expect(mockUsersService.update).toHaveBeenCalledWith('1', mockUser[0]);
  // });

  // it('should delete a user', async () => {
  //   const deletedUser = await controller.remove('1');
  //   expect(deletedUser).toEqual(mockUser[0]);
  //   expect(mockUsersService.remove).toHaveBeenCalledWith('1');
  // });



