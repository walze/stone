import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { CustomerService } from './customer/customer.service';

@Controller()
export class AppController {
  constructor(private readonly cService: CustomerService) {}

  @Get()
  @UseGuards(AuthGuard)
  get() {
    return this.cService.all();
  }
}
