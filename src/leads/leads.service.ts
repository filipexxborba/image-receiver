import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Lead } from './lead.interface';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('LEAD_MODEL')
    private leadModel: Model<Lead>,
  ) {}

  async create(createLeadDto: { name: string; email: string }): Promise<Lead> {
    const createdLead = new this.leadModel(createLeadDto);
    return createdLead.save();
  }
  async findAll(): Promise<Lead[]> {
    return this.leadModel.find().exec();
  }
}
