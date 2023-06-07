import { Injectable } from '@nestjs/common';
import { ICustomer } from '@typings';
import Redis from 'ioredis';
import * as uuid from 'uuid';

const redis = new Redis();

@Injectable()
export class CustomerService {
  async save(document: number, name: string) {
    const id = uuid.v4();
    const customer = { id, document, name };

    await redis.set(`customer:${id}`, JSON.stringify(customer));

    return customer;
  }

  async get(id: string) {
    const customer = await redis.get(`customer:${id}`);
    if (!customer) return null;

    return JSON.parse(customer);
  }

  async update({ document, id, name }: Partial<ICustomer>) {
    const customer = await this.get(id);
    if (!customer) return null;

    const updatedCustomer = { ...customer, document, name };

    await redis.set(`customer:${id}`, JSON.stringify(updatedCustomer));

    return updatedCustomer;
  }
}
