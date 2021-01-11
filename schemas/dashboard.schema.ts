import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { BusinessSchemaName } from './business.schema';

export const DashboardSchemaName: string = 'Dashboard';
export const DashboardSchema: Schema = new Schema(
  {
    _id: {
      default: uuidV4,
      type: Schema.Types.String,
    },
    business: {
      index: true,
      ref: BusinessSchemaName,
      required: true,
      type: Schema.Types.String,
    },
    name: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: { },
  },
);
