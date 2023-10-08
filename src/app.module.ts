import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';

@Module({
  imports: [ImagesModule, ConfigModule.forRoot(), LeadsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
