import { DashboardInterface } from './dashboard.interface';
import { WidgetSettingInterface } from './widget-setting.interface';
import { WidgetTypeEnum } from '../enums';

export interface WidgetInterface {
  name: string;
  size: string;
  type: WidgetTypeEnum;
  dashboard: DashboardInterface;
  widgetSettings: WidgetSettingInterface[];
}
