import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BusinessSchema,
  BusinessSchemaName,
  ChannelSetSchema,
  ChannelSetSchemaName,
  DashboardSchema,
  DashboardSchemaName,
  DimensionSchema,
  DimensionSchemaName,
  MetricSchema,
  MetricSchemaName,
  WidgetSchema,
  WidgetSchemaName,
} from './schemas';
import {
  DashboardController,
  DimensionController,
  MetricController,
  StatisticsController,
  WidgetController,
} from './controllers';
import {
  BusinessService,
  DashboardService,
  DimensionService,
  MetricService,
  StatisticsService,
  WidgetService,
} from './services';
import { EventsGateway } from './ws';

@Module({
  controllers: [
    DashboardController,
    DimensionController,
    MetricController,
    StatisticsController,
    WidgetController,
  ],
  exports: [
    BusinessService,
  ],
  imports: [
    MongooseModule.forFeature([
      { name: BusinessSchemaName, schema: BusinessSchema },
      { name: ChannelSetSchemaName, schema: ChannelSetSchema },
      { name: DashboardSchemaName, schema: DashboardSchema },
      { name: DimensionSchemaName, schema: DimensionSchema },
      { name: MetricSchemaName, schema: MetricSchema },
      { name: WidgetSchemaName, schema: WidgetSchema },
    ]),
  ],
  providers: [
    BusinessService,
    DashboardService,
    DimensionService,
    EventsGateway,
    MetricService,
    StatisticsService,
    WidgetService,
  ],
})
export class StatisticsModule { }
