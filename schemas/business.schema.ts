import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { InstalledAppSchema } from './installed-app.schema';
import { ThemeSettingsSchema } from './theme-settings.schema';

export const BusinessSchemaName: string = 'Business';
export const BusinessSchema: Schema = new Schema(
  {
    _id: {
      default: uuid,
      type: Schema.Types.String,
    },
    installedApps: [InstalledAppSchema],
    themeSettings: ThemeSettingsSchema,
  },
  {
    timestamps: true,
  },
);
