import cubejs, { CubejsApi, ResultSet, TimeDimensionGranularity, TimeDimensionRanged } from '@cubejs-client/core';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import { WidgetSchemaName } from '../schemas';
import { DimensionModel, MetricModel, WidgetModel } from '../models';
import { WidgetSettingTypeEnum } from '../enums';
import { DimensionService } from '../services/dimension.service';
import { MetricService } from '../services/metric.service';
import { WidgetService } from '../services/widget.service';
import { environment } from '../../environments';

@Injectable()
export class StatisticsService {
  private readonly cubejs: CubejsApi;

  constructor(
    protected readonly logger: Logger,
    @InjectModel(WidgetSchemaName)
    private readonly widgetModel: Model<WidgetModel>,
    private readonly metricService: MetricService,
    private readonly dimensionService: DimensionService,
    private readonly widgetService: WidgetService,
  ) {
    this.cubejs = cubejs(
      jwt.sign({ }, environment.cubejs.apiSecret, {
        expiresIn: '180d',
      }),
      { apiUrl: `http://${ environment.cubejs.host }:${ environment.cubejs.port }/cubejs-api/v1` },
    );
  }

  public async getData(widget: WidgetModel): Promise<any> {
    await widget.populate({ path: 'dashboard', populate: { path: 'business' } }).execPopulate();

    const metricsIds: string[] = this.widgetService.resolveSettings(widget, WidgetSettingTypeEnum.Metric);
    const dimensionsIds: string[] = this.widgetService.resolveSettings(widget, WidgetSettingTypeEnum.Dimension);
    const viewType: string = this.widgetService.resolveSetting(widget, WidgetSettingTypeEnum.ViewType);
    const filters: any[] = this.widgetService.resolveSettings(widget, WidgetSettingTypeEnum.Filter);

    const metrics: MetricModel[] = await this.metricService.findAll({ _id: { $in: metricsIds } });
    const dimensions: DimensionModel[] = await this.dimensionService.findAll({ _id: { $in: dimensionsIds } });

    try {
      const data: ResultSet = await this.cubejs.load({
        dimensions: dimensions
          .map((dimension: DimensionModel) => `${ widget.type }.${ dimension.name }`)
          .filter((dimension: string) => dimension !== `${ widget.type }.createdAt`),
        filters: (filters || []).map((filter: any) => ({
          member: `${ widget.type }.${ filter.name }`,
          operator: 'equals',
          values: [filter.value],
        })),
        measures: metrics.map((metric: MetricModel) => `${ widget.type }.${ metric.name }`),
        timeDimensions: this.resolveTimeDimensions(widget),
      });

      return this.resolveGrowthRates(data);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  private resolveTimeDimensions(
    widget: WidgetModel,
  ): TimeDimensionRanged[] {
    const granularity: TimeDimensionGranularity = this.widgetService.resolveSetting(
      widget,
      WidgetSettingTypeEnum.Granularity,
    );
    const dateTimeFrom: string = this.widgetService.resolveSetting(widget, WidgetSettingTypeEnum.DateTimeFrom);
    const dateTimeTo: string = this.widgetService.resolveSetting(widget, WidgetSettingTypeEnum.DateTimeTo);

    const timeDimensions: TimeDimensionRanged[] = [{
      dimension: `${ widget.type }.createdAt`,
    }];

    if (dateTimeFrom && dateTimeTo) {
      timeDimensions[0].dateRange = [dateTimeFrom, dateTimeTo] as never;
    }

    if (granularity) {
      timeDimensions[0].granularity = granularity;
    }

    return timeDimensions;
  }

  private resolveGrowthRates(data: any): any {
    const results: any = data;

    if (results?.loadResponse?.results.length) {
      results.loadResponse.results.forEach((result: any) => {
        result?.data.forEach((row: any, index: number) => {
          row['transactions.yoy'] = Math.floor(Math.random() * 101) - 50;
        });
      });
    }

    return data;
  }
}
