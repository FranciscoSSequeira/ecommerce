// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { App } from 'supertest/types';
// import { AppModule } from './../src/app.module';
// import { UsersRepository } from '../src/users/users.repository';
// import { JwtService } from '@nestjs/jwt';
//     import * as bcrypt from 'bcrypt';

// describe('AppController (e2e)', () => {
//   let app: INestApplication;

//   let mockUserRepository : Partial<UsersRepository>;

//   let jwtService: JwtService

//   const testUser = {
//     id: '1',
//     name: 'John Doe',
//     password: 'Pass!1234',
//     email: 'john@mail.com',
//     isAdmin: false,
//     phone: 1234567890,
//     address: '123 Main St',
//     country: 'USA',
//     city: 'New York',
//     orders: [],
//   };

//   beforeEach(async () => {
//     mockUserRepository = {
//       findByEmail : jest.fn().mockResolvedValue(testUser),
    
//     }

//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule], 
//   })
//       .overrideProvider(UsersRepository)
//       .useValue(mockUserRepository)
//       .compile();

//     app = moduleFixture.createNestApplication();
//     await app.init();
//     jwtService = moduleFixture.get<JwtService>(JwtService);
//     jest.spyOn(bcrypt, 'compare').mockImplementation((password: string, hash: string) => {
//       return Promise.resolve(password === 'Pass!1234')
//       }); 
//   }
// ); 
    
//     it('auth/signin (POST) should authenticate the user and return a token', () => {
//     return request(app.getHttpServer())
//       .post('/auth/signin')
//       .send({
//         email: 'john@mail.com',
//         password: 'Pass!1234', //si modificas la contraseña, deberia dar error
//       })
//       .expect((res) => {
//         expect(res.body).toHaveProperty('token');
//         expect(res.body.token).toBeDefined()
//         })
//     })  
//     afterAll(async () => {
//       await app.close();
//     })
// })

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { UsersRepository } from '../src/users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mockUserRepository: Partial<UsersRepository>;
  let jwtService: JwtService;

  const testUser = {
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
  };

  beforeEach(async () => {
    mockUserRepository = {
      findByEmail: jest.fn().mockResolvedValue(testUser),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersRepository)
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    jwtService = moduleFixture.get<JwtService>(JwtService);
    jest.spyOn(bcrypt, 'compare').mockImplementation((password: string, hash: string) => {
      return Promise.resolve(password === 'Pass!1234');
    });
  });

  // 1. /auth/signin (POST)
  it('auth/signin (POST) should authenticate the user and return a token', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 'john@mail.com',
        password: 'Pass!1234',
      })
      .expect((res) => {
        expect(res.body).toHaveProperty('token');
        expect(res.body.token).toBeDefined();
      });
  });

  // 2. /products (GET)
  it('/products (GET) - lista de productos', async () => {
    const res = await request(app.getHttpServer())
      .get('/products')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 3. /products/:id (GET)
  it('/products/:id (GET) - detalle de producto', async () => {
  const res = await request(app.getHttpServer())
    .get('/products/1053b190-025c-430d-a17b-77c73cd32ff5')
    .expect(200);
  expect(res.body).toHaveProperty('id', '1053b190-025c-430d-a17b-77c73cd32ff5'); // id de un producto harcodeado que existe en la base de datos
  });

  // 4. /products/seeder (GET) - agrega productos de prueba
 it('/products/seeder (GET) - agrega productos de prueba', async () => {
  const res = await request(app.getHttpServer())
    .get('/products/seeder')
    .expect(200); 

  expect(res.text).toBe('Productos agregados');
});

// 5 /categories/seeder (GET) - agrega categorías de prueba
 it('/categories/seeder (GET) - agrega categorías de prueba', async () => {
  const res = await request(app.getHttpServer())
    .get('/categories/seeder')
    .expect(200); 

  expect(res.text).toBe('Categorias agregadas');
});

  afterAll(async () => {
    await app.close();
  });
});

