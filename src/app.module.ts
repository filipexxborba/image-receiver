import { Module } from '@nestjs/common';
import { ImagesModule } from './images/images.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ImagesModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}