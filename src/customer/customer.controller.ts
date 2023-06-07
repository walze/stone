import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '@/auth/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @UseGuards(AuthGuard)
  save(@Body('document') document: number, @Body('name') name: string) {
    return this.customerService.save(document, name);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  get(@Param('id') id: string) {
    return this.customerService.get(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body('document') document: number,
    @Body('name') name: string,
  ) {
    return this.customerService.update({ document, id, name });
  }
}
