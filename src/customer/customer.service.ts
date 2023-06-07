import { HttpException, Injectable } from '@nestjs/common';
import { ICustomer } from '@/typings';
import Redis from 'ioredis';
import * as uuid from 'uuid';

const host = process.env.REDIS_HOST || 'localhost';

const defaultRedisError = () => {
  throw new HttpException('Redis is Unavailable', 502);
};

@Injectable()
export class CustomerService {
  private readonly redis = new Redis({
    host,
    connectTimeout: 2000,
    commandTimeout: 2000,
    disconnectTimeout: 2000,
  });

  async save(document: number, name: string) {
    const id = uuid.v4();
    const customer = { id, document, name };

    await this.redis
      .set(`customer:${id}`, JSON.stringify(customer))
      .catch(defaultRedisError);

    return customer;
  }

  async get(id: string) {
    const customer = await this.redis
      .get(`customer:${id}`)
      .catch(defaultRedisError);
    if (!customer) return null;

    return JSON.parse(customer);
  }

  async update({ document, id, name }: Partial<ICustomer>) {
    const customer = await this.get(id).catch(defaultRedisError);
    if (!customer) return null;

    const updatedCustomer = { ...customer, document, name };

    await this.redis.set(`customer:${id}`, JSON.stringify(updatedCustomer));

    return updatedCustomer;
  }
}
