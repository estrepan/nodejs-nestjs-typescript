import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { WidgetSettingInterface } from '../interfaces';

export class UpdateWidgetDto {
  @ApiModelProperty()
  @ValidateNested()
  @IsNotEmpty()
  public widgetSettings: WidgetSettingInterface[];
}
