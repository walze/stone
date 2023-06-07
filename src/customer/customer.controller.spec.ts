import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [CustomerService],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should save a customer', async () => {
    const customer = await controller.save(123456789, 'John Doe');

    expect(customer).toMatchObject({
      document: 123456789,
      name: 'John Doe',
    });
  });

  it('should get a customer', async () => {
    const customer = await controller.save(123456789, 'John Doe');
    const customerFound = await controller.get(customer.id);

    expect(customerFound).toMatchObject({
      document: 123456789,
      name: 'John Doe',
    });
  });

  it('should update a customer', async () => {
    const customer = await controller.save(123456789, 'John Doe');
    const customerUpdated = await controller.update(
      customer.id,
      987654321,
      'Jane Doe',
    );

    expect(customerUpdated).toMatchObject({
      document: 987654321,
      name: 'Jane Doe',
    });
  });

  it('should not update a customer if it does not exist', async () => {
    const customerUpdated = await controller.update(
      'non-existent-id',
      987654321,
      'Jane Doe',
    );

    expect(customerUpdated).toBeNull();
  });
});
