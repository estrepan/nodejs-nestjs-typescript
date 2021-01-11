import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { DashboardSchemaName } from './dashboard.schema';
import { WidgetSettingSchema } from './widget-setting.schema';
import { WidgetTypeEnum } from '../enums';

export const WidgetSchemaName: string = 'Widget';
export const WidgetSchema: Schema = new Schema(
  {
    _id: {
      default: uuidV4,
      type: Schema.Types.String,
    },
    dashboard: {
      index: true,
      ref: DashboardSchemaName,
      required: true,
      type: Schema.Types.String,
    },
    name: {
      type: Schema.Types.String,
    },
    size: {
      type: Schema.Types.String,
    },
    type: {
      required: true,
      type: WidgetTypeEnum,
    },
    widgetSettings: Schema.Types.Mixed,
  },
  {
    timestamps: { },
  },
);
