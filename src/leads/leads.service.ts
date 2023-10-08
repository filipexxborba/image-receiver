import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Lead } from './lead.interface';
import { CreateLeadDTO } from './dto/create-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @Inject('LEAD_MODEL')
    private leadModel: Model<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDTO): Promise<Lead> {
    const created = new this.leadModel(createLeadDto).save();
    return created;
  }
  async findAll(): Promise<Lead[]> {
    const leads = await this.leadModel.find({});
    return leads;
  }
}
