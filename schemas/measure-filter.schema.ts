import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { WidgetSettingTypeEnum } from '../enums';
import { MeasureFilterInterface } from '../interfaces';

export const MeasureFilterSchema: Schema = new Schema(
  {
    name: {
      required: true,
      type: Schema.Types.String,
    },
    value: {
      required: true,
      type: Schema.Types.String,
    },
  },
  {
    timestamps: { },
  },
);
