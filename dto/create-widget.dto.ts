import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray, IsEnum } from 'class-validator';
import { WidgetSettingDto } from '../dto';
import { WidgetTypeEnum } from '../enums';

export class CreateWidgetDto {
  @ApiModelPropertyOptional()
  @IsString()
  public name: string;

  @ApiModelPropertyOptional()
  @IsString()
  public size: string;

  @ApiModelProperty({ enum: WidgetTypeEnum })
  @IsNotEmpty()
  @IsEnum(WidgetTypeEnum)
  public type: WidgetTypeEnum;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsArray()
  public widgetSettings: WidgetSettingDto[];
}
