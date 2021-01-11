import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { WidgetSettingTypeEnum } from '../enums';
import { WidgetSettingInterface } from '../interfaces';

export class WidgetSettingDto implements WidgetSettingInterface {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(WidgetSettingTypeEnum)
  public type: WidgetSettingTypeEnum;

  @ApiModelProperty()
  @IsNotEmpty()
  public value: any;
}
