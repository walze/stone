import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { CustomerService } from './customer/customer.service';

@Module({
  imports: [AuthModule, CustomerModule],
  controllers: [AppController],
  providers: [CustomerService],
})
export class AppModule {}
