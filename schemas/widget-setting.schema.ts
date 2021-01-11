import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { WidgetSettingTypeEnum } from '../enums';
import { MeasureFilterSchema } from '../schemas/measure-filter.schema';

export const WidgetSettingSchemaName: string = 'WidgetSetting';
export const WidgetSettingSchema: Schema = new Schema(
  {
    type: {
      required: true,
      type: WidgetSettingTypeEnum,
    },
    value: {
      required: true,
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: { },
  },
);
