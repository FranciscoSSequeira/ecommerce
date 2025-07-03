// import { Test, TestingModule } from '@nestjs/testing';
// import { ProductsService } from './products.service';
// import { ProductsRepository } from './products.repository';
// import { NotFoundException } from '@nestjs/common';

// describe('ProductsService', () => {
//   let service: ProductsService;
//   let repository: ProductsRepository;

//   beforeEach(async () => {
//     const mockProductsRepository = {
//       findOneBy: jest.fn(),
//     };

//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         ProductsService,
//         { provide: ProductsRepository, useValue: mockProductsRepository },
//       ],
//     }).compile();

//     service = module.get<ProductsService>(ProductsService);
//     repository = module.get<ProductsRepository>(ProductsRepository);
//   });

//   it('should return a product by id', async () => {
//     const product = { id: '1', name: 'Producto', price: 100 };
//     ((repository as any).findOneBy as jest.Mock).mockResolvedValue(product as any);

//     // jest.spyOn(repository, 'findOneBy').mockResolvedValue(product as any);

//     const result = await service.findOne('1');
//     expect(result).toEqual(product);
//     expect((repository as any).findOneBy).toHaveBeenCalledWith({ id: '1' });

//     // expect(repository.findOneBy).toHaveBeenCalledWith({id: '1'});
//   });
  
// it('should throw NotFoundException if product does not exist', async () => {
//   ((repository as any).findOneBy as jest.Mock).mockResolvedValue(undefined as any);

//   // jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined as any);

//   await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
//   await expect(service.findOne('999')).rejects.toThrow('Producto no encontrado');
// });
// });


import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: {  findOne: jest.Mock,findOneBy: jest.Mock };

  beforeEach(async () => {
    repository = {
      findOne: jest.fn(),
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

 it('should return a product by id', async () => {
  const product = { id: '1', name: 'Producto', price: 100 };
  repository.findOne.mockResolvedValue(product);

  const result = await service.findOne('1');
  expect(result).toEqual(product);
  expect(repository.findOne).toHaveBeenCalledWith('1');
});

it('should throw NotFoundException if product does not exist', async () => {
  repository.findOne.mockImplementation(() => { throw new NotFoundException('Producto no encontrado'); });

  await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  await expect(service.findOne('999')).rejects.toThrow('Producto no encontrado');
});
});