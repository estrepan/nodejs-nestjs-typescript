import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWidgetDto, UpdateWidgetDto, WidgetSettingDto } from '../dto';
import { DashboardModel, DimensionModel, MetricModel, WidgetModel } from '../models';
import { DashboardSchemaName, DimensionSchemaName, MetricSchemaName, WidgetSchemaName } from '../schemas';
import { WidgetSettingInterface } from '../interfaces';
import { WidgetSettingTypeEnum } from '../enums';

@Injectable()
export class WidgetService {
  constructor(
    @InjectModel(WidgetSchemaName)
    private readonly widgetModel: Model<WidgetModel>,
    @InjectModel(DashboardSchemaName)
    private readonly dashboardModel: Model<DashboardModel>,
    @InjectModel(MetricSchemaName)
    private readonly metricModel: Model<MetricModel>,
    @InjectModel(DimensionSchemaName)
    private readonly dimensionModel: Model<DimensionModel>,
  ) {
  }

  public async create(dashboard: DashboardModel, dto: CreateWidgetDto): Promise<WidgetModel> {
    const widgetSettings: WidgetSettingInterface[] = await this.resolveMetricsAndDimensions(dto);
    const widget: WidgetModel = await this.widgetModel.create({
      dashboard: dashboard._id,
      name: dto.name,
      size: dto.size,
      type: dto.type,
      widgetSettings,
    });

    return this.widgetModel.findById(widget._id).populate('dashboard').exec();
  }

  public async findOneById(widgetId: string): Promise<WidgetModel> {
    return this.widgetModel.findById(widgetId).populate('dashboard').exec();
  }

  public async findAll(dashboard: DashboardModel): Promise<WidgetModel[]> {
    return this.widgetModel
      .find({ dashboard: dashboard._id })
      .sort({ title: 1 })
      .populate('dashboard')
      .exec();
  }

  public async remove(widget: WidgetModel): Promise<void> {
    await this.widgetModel.deleteOne({ _id: widget.id }).exec();
  }

  public async update(widget: WidgetModel, dto: UpdateWidgetDto): Promise<WidgetModel> {
    const updatedData: any = { };
    Object.keys(dto).forEach((key: string) => {
      updatedData[`${ key }`] = dto[key];
    });

    await this.widgetModel.updateOne(
      { _id: widget.id },
      { $set: updatedData },
    ).exec();

    return this.widgetModel.findById(widget.id).populate('dashboard').exec();
  }

  public async updateWidgetSettings(widget: WidgetModel, dto: WidgetSettingDto[]): Promise<WidgetModel> {
    await this.widgetModel.updateOne(
      { _id: widget.id },
      { $set: { widgetSettings: dto } as any },
    ).exec();

    return this.widgetModel.findById(widget.id).populate('dashboard').exec();
  }

  public resolveSetting(widget: WidgetModel, settingType: WidgetSettingTypeEnum): any {
    return (widget.widgetSettings.find((setting: WidgetSettingInterface) => setting.type === settingType) || { }).value;
  }

  public resolveSettings(widget: WidgetModel, settingType: WidgetSettingTypeEnum): any {
    return widget.widgetSettings
      .filter((setting: WidgetSettingInterface) => setting.type === settingType)
      .map((setting: WidgetSettingInterface) => setting.value);
  }

  private async resolveMetricsAndDimensions(dto: CreateWidgetDto): Promise<WidgetSettingInterface[]> {
    const metrics: MetricModel[] = await this.metricModel.find({ types: dto.type });

    metrics.forEach((metric: MetricModel) => {
      dto.widgetSettings.push({
        type: WidgetSettingTypeEnum.Metric,
        value: metric._id,
      } as WidgetSettingInterface);
    });

    return dto.widgetSettings;
  }
}
