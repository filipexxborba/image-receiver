import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { leadsProviders } from './leads.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [LeadsController],
  providers: [LeadsService, ...leadsProviders],
})
export class LeadsModule {}
