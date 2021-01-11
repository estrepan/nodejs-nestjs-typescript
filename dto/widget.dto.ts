import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested, IsString, IsEnum } from 'class-validator';
import { WidgetInterface, WidgetSettingInterface } from '../interfaces';
import { DashboardDto, WidgetSettingDto } from '../dto';
import { WidgetTypeEnum } from '../enums';

export class WidgetDto implements WidgetInterface {
  @ApiModelPropertyOptional()
  @IsString()
  public name: string;

  @ApiModelPropertyOptional()
  @IsString()
  public size: WidgetTypeEnum;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(WidgetTypeEnum)
  public type: WidgetTypeEnum;

  @ApiModelProperty()
  @ValidateNested()
  @IsNotEmpty()
  public dashboard: DashboardDto;

  @ApiModelProperty()
  @IsNotEmpty()
  public widgetSettings: WidgetSettingDto[];
}
