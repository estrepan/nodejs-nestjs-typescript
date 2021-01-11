import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDashboardDto, UpdateDashboardDto } from '../dto';
import { BusinessModel, DashboardModel } from '../models';
import { DashboardSchemaName, BusinessSchemaName } from '../schemas';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(DashboardSchemaName)
    private readonly dashboardModel: Model<DashboardModel>,
    @InjectModel(BusinessSchemaName)
    private readonly businessModel: Model<BusinessModel>,
  ) { }

  public async create(dto: CreateDashboardDto, business: BusinessModel): Promise<DashboardModel> {
    const dashboard: DashboardModel = await this.dashboardModel.create({
      business,
      name: dto.name,
    });

    return this.dashboardModel.findById(dashboard._id).populate('business').exec();
  }

  public async findOneById(dashboardId: string): Promise<DashboardModel> {
    return this.dashboardModel.findById(dashboardId).populate('business').exec();
  }

  public async findAll(): Promise<DashboardModel[]> {
    return this.dashboardModel.find({ }).sort({ name: 1 }).populate('business').exec();
  }

  public async remove(dashboard: DashboardModel): Promise<void> {
    await this.dashboardModel.deleteOne({ _id: dashboard.id }).exec();
  }

  public async update(dashboard: DashboardModel, dto: UpdateDashboardDto): Promise<DashboardModel> {
    const updatedData: any = { };
    Object.keys(dto).forEach((key: string) => {
      updatedData[`${key}`] = dto[key];
    });

    await this.dashboardModel.updateOne(
      { _id: dashboard.id },
      { $set: updatedData },
    ).exec();

    return this.dashboardModel.findById(dashboard.id).populate('business').exec();
  }
}
