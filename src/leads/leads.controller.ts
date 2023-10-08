import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LeadsService } from './leads.service';

@ApiTags('Leads')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  @Post('create')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
      },
    },
  })
  async createLead(@Body() body: { name: string; email: string }) {
    return this.leadsService.create({ name: body.name, email: body.email });
  }

  //   Get all
  @Get('all')
  async getAllLeads() {
    return this.leadsService.findAll();
  }
}
