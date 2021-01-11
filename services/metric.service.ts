import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MetricModel } from '../models';
import { MetricSchemaName } from '../schemas';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(MetricSchemaName)
    private readonly metricModel: Model<MetricModel>,
  ) { }

  public async findAll(conditions: any = { }): Promise<MetricModel[]> {
    return this.metricModel.find(conditions).sort({ name: 1 }).exec();
  }
}
