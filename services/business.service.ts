import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BusinessSchemaName } from '../schemas';
import { BusinessModel } from '../models';

@Injectable()
export class BusinessService {
  constructor(
    @InjectModel(BusinessSchemaName)
    private readonly businessModel: Model<BusinessModel>,
  ) { }

  public async findOne(credentials: any, sort: any): Promise<BusinessModel> {
    return this.businessModel.findOne().sort(sort).exec();
  }

  public async find(conditions: any): Promise<BusinessModel[]> {
    return this.businessModel.find(conditions);
  }

  public async insertMany(docs: any[]): Promise<BusinessModel[]> {
    return this.businessModel.insertMany(docs);
  }

  public async updateOne(conditions: any, doc: any): Promise<BusinessModel[]> {
    return this.businessModel.updateOne(conditions, doc);
  }

  public availableTypes(business: BusinessModel): string[] {
    return business.installedApps.filter((app: any) => app.installed).map((app: any) => app.code);
  }

  public isAvailableType(business: BusinessModel, type: string): boolean {
    return this.availableTypes(business).includes(type);
  }
}
