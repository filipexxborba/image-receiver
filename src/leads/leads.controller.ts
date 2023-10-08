import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import { CreateLeadDTO } from './dto/create-lead.dto';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  @Post('create')
  async createLead(@Body() createLeadDto: CreateLeadDTO) {
    console.log('Novo lead: ', createLeadDto);
    return this.leadsService.create(createLeadDto);
  }

  //   Get all
  @Get('all')
  async getAllLeads() {
    return this.leadsService.findAll();
  }
}
