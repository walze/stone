import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [AuthModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
